
import { useCart } from "@/context/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingBag, Trash2, ArrowLeft, ArrowRight, Clock, Heart, Tag, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

const Cart = () => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    totalItems, 
    totalPrice,
    applyPromoCode,
    promoDiscount,
    estimatedDeliveryDays,
    saveForLater,
    savedItems,
    moveToCart
  } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");

  const handleCheckout = () => {
    toast.success("Checkout functionality will be implemented with Supabase integration!");
    // Future integration: navigate to checkout page
  };

  const calculateSubtotal = (price: number, quantity: number) => {
    return (price * quantity).toFixed(2);
  };

  const handleApplyPromo = () => {
    if (promoCode.trim() === "") {
      toast.error("Please enter a promo code");
      return;
    }
    applyPromoCode(promoCode);
  };

  // Calculate order summary values
  const subtotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const discount = subtotal * (promoDiscount / 100);
  const tax = (subtotal - discount) * 0.07; // 7% tax

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl font-bold mb-4">Your Shopping Cart</h1>
        {items.length === 0 && savedItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="flex justify-center mb-6">
              <ShoppingBag className="h-20 w-20 text-gray-300" />
            </div>
            <h2 className="text-2xl font-medium text-gray-700 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added any items to your cart yet. Explore our catalog to find products you'll love.</p>
            <Button onClick={() => navigate('/')} className="bg-product-accent hover:bg-product-secondary">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items - Takes up 2/3 of the screen on large devices */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main Cart */}
              {items.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl flex items-center">
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Cart Items ({totalItems})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {items.map((item, index) => (
                            <TableRow key={index} className="hover:bg-gray-50">
                              <TableCell>
                                <div className="flex items-center space-x-4">
                                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                                    <img 
                                      src={item.product.images[0].src} 
                                      alt={item.product.name} 
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>
                                  <div>
                                    <h3 className="text-base font-medium text-gray-900 mb-1">{item.product.name}</h3>
                                    <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                                      {item.color && (
                                        <span className="flex items-center">
                                          Color: {item.color.name}
                                          <span 
                                            className="ml-1 h-3 w-3 rounded-full inline-block border border-gray-300" 
                                            style={{backgroundColor: item.color.value}}
                                          ></span>
                                        </span>
                                      )}
                                      {item.size && (
                                        <span>Size: {item.size.name}</span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-sm text-gray-700">
                                ${item.product.price.toFixed(2)}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center border rounded-md w-fit">
                                  <button
                                    onClick={() => updateQuantity(index, item.quantity - 1)}
                                    className="w-8 h-8 flex items-center justify-center border-r hover:bg-gray-100"
                                    aria-label="Decrease quantity"
                                  >
                                    <span className="sr-only">Decrease</span>
                                    -
                                  </button>
                                  <input
                                    type="text"
                                    value={item.quantity}
                                    onChange={(e) => {
                                      const val = parseInt(e.target.value);
                                      if (!isNaN(val)) {
                                        updateQuantity(index, val);
                                      }
                                    }}
                                    className="w-10 h-8 text-center focus:outline-none text-sm"
                                    aria-label="Quantity"
                                  />
                                  <button
                                    onClick={() => updateQuantity(index, item.quantity + 1)}
                                    className="w-8 h-8 flex items-center justify-center border-l hover:bg-gray-100"
                                    aria-label="Increase quantity"
                                  >
                                    <span className="sr-only">Increase</span>
                                    +
                                  </button>
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">
                                ${calculateSubtotal(item.product.price, item.quantity)}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end space-x-2">
                                  <button 
                                    onClick={() => saveForLater(index)}
                                    className="text-gray-500 hover:text-gray-700 p-1"
                                    aria-label="Save for later"
                                  >
                                    <Heart className="h-4 w-4" />
                                  </button>
                                  <button 
                                    onClick={() => removeFromCart(index)}
                                    className="text-red-500 hover:text-red-700 p-1"
                                    aria-label="Remove item"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-6 flex justify-between">
                    <Button onClick={() => navigate('/')} variant="outline" className="flex items-center">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Button>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      Estimated Delivery: {estimatedDeliveryDays} business days
                    </div>
                  </CardFooter>
                </Card>
              )}

              {/* Saved for Later Section */}
              {savedItems.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl flex items-center">
                      <Heart className="mr-2 h-5 w-5" />
                      Saved for Later ({savedItems.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {savedItems.map((item, index) => (
                            <TableRow key={index} className="hover:bg-gray-50">
                              <TableCell>
                                <div className="flex items-center space-x-4">
                                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                                    <img 
                                      src={item.product.images[0].src} 
                                      alt={item.product.name} 
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>
                                  <div>
                                    <h3 className="text-base font-medium text-gray-900 mb-1">{item.product.name}</h3>
                                    <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                                      {item.color && (
                                        <span className="flex items-center">
                                          Color: {item.color.name}
                                          <span 
                                            className="ml-1 h-3 w-3 rounded-full inline-block border border-gray-300" 
                                            style={{backgroundColor: item.color.value}}
                                          ></span>
                                        </span>
                                      )}
                                      {item.size && (
                                        <span>Size: {item.size.name}</span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-sm text-gray-700">
                                ${item.product.price.toFixed(2)}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end space-x-2">
                                  <Button 
                                    onClick={() => moveToCart(index)}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs"
                                  >
                                    Move to Cart
                                  </Button>
                                  <button 
                                    onClick={() => {
                                      setSavedItems(savedItems.filter((_, i) => i !== index));
                                      toast.info("Item removed from saved items");
                                    }}
                                    className="text-red-500 hover:text-red-700 p-1"
                                    aria-label="Remove item"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary - Takes up 1/3 of the screen on large devices */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      
                      {promoDiscount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount ({promoDiscount}%)</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax (7%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="text-green-600">Free</span>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200 mt-4">
                        <div className="flex justify-between font-medium text-lg">
                          <span>Total</span>
                          <span className="text-product-accent">${totalPrice.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500 mt-2">
                          <Clock className="h-4 w-4 mr-1" />
                          Estimated Delivery: {estimatedDeliveryDays} business days
                        </div>
                      </div>
                    </div>
                    
                    {/* Promo Code Section */}
                    <div className="pt-4">
                      <div className="flex gap-2 mb-4">
                        <div className="relative flex-1">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Tag className="h-4 w-4 text-gray-400" />
                          </div>
                          <Input
                            type="text"
                            placeholder="Promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        <Button 
                          onClick={handleApplyPromo} 
                          variant="outline"
                          className="whitespace-nowrap"
                        >
                          Apply
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">Try WELCOME10, SPRING25, or SAVE15</p>
                    </div>

                    <Button 
                      onClick={handleCheckout}
                      className="w-full mt-6 bg-product-accent hover:bg-product-secondary"
                      disabled={items.length === 0}
                    >
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                  <CardFooter className="border-t pt-4 text-xs text-gray-500">
                    <p>
                      By proceeding to checkout, you agree to our{" "}
                      <Link to="#" className="text-product-accent hover:underline">Terms & Conditions</Link> and{" "}
                      <Link to="#" className="text-product-accent hover:underline">Privacy Policy</Link>.
                    </p>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
