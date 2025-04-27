
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

interface RequestData {
  items: {
    productId: number;
    name: string;
    price: number;
    quantity: number;
  }[];
  amount: number;
  currency: string;
}

interface RazorpayOrder {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  attempts: number;
  notes: Record<string, string>;
  created_at: number;
}

serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Setup Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    )

    // Get the user from the auth header
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    // Allow anonymous users for guest checkout
    const userId = user?.id

    const requestData: RequestData = await req.json()
    const { items, amount, currency } = requestData

    if (!items || items.length === 0 || !amount) {
      return new Response(JSON.stringify({ error: 'Invalid order data' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Generate a receipt ID (would normally be stored in your DB)
    const receiptId = `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`

    // Call Razorpay API to create an order
    const razorpayKey = Deno.env.get('RAZORPAY_KEY_ID')
    const razorpaySecret = Deno.env.get('RAZORPAY_KEY_SECRET')

    if (!razorpayKey || !razorpaySecret) {
      return new Response(JSON.stringify({ error: 'Razorpay configuration missing' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const auth = btoa(`${razorpayKey}:${razorpaySecret}`)

    // Create Razorpay order
    const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Razorpay expects amount in the smallest currency unit (paise for INR)
        currency,
        receipt: receiptId,
        notes: {
          userId: userId || 'guest',
        },
      }),
    })

    const razorpayData = await razorpayResponse.json()

    if (!razorpayResponse.ok) {
      return new Response(JSON.stringify({ error: razorpayData.error?.description || 'Razorpay order creation failed' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // For a real app, you would store the order in your database here
    // with the service role client to bypass RLS
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Example: Store order in database
    // const { data: orderData, error: orderError } = await supabaseAdmin
    //   .from('orders')
    //   .insert({
    //     user_id: userId,
    //     razorpay_order_id: razorpayData.id,
    //     amount,
    //     currency,
    //     status: 'created',
    //     items: JSON.stringify(items)
    //   })
    //   .select()
    //   .single()

    // Create checkout URL for frontend to use
    const checkoutUrl = `https://checkout.razorpay.com/v1/checkout.js?key=${razorpayKey}&order_id=${razorpayData.id}`

    return new Response(
      JSON.stringify({
        orderId: razorpayData.id,
        checkoutUrl,
        amount: razorpayData.amount,
        currency: razorpayData.currency
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
