
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface BillSummaryProps {
  subtotal: number;
  savings?: number;
  deliveryCharge?: number;
  tax?: number;
  totalAmount: number;
}

export const BillSummary = ({
  subtotal,
  savings = 200,
  deliveryCharge = 0,
  tax = 0,
  totalAmount
}: BillSummaryProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Calculate handling charges (example: 3 charges of ₹11.99 each)
  const handlingCharges = [
    { label: "Handling charge", original: 27, final: 11.99 },
    { label: "Handling charge", original: 27, final: 11.99 },
    { label: "Handling charge", original: 27, final: 11.99 },
  ];

  return (
    <Collapsible 
      open={isOpen} 
      onOpenChange={setIsOpen}
      className="w-full px-4 py-3 bg-pink-100 rounded-lg"
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <div className="w-6 h-6 border border-gray-700 rounded flex items-center justify-center mr-3">
            <span className="text-xs font-bold">₹</span>
          </div>
          <h3 className="text-xl font-bold">Bill summary</h3>
        </div>
        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </CollapsibleTrigger>
      
      <CollapsibleContent className="mt-4 space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Item Total & GST</span>
            <div className="text-right">
              <span className="text-gray-500 line-through mr-2">₹{(subtotal * 1.1).toFixed(2)}</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
          </div>
          
          {handlingCharges.map((charge, index) => (
            <div key={index} className="flex justify-between">
              <span>{charge.label}</span>
              <div className="text-right">
                <span className="text-gray-500 line-through mr-2">₹{charge.original}</span>
                <span>₹{charge.final}</span>
              </div>
            </div>
          ))}
          
          <div className="flex justify-between font-bold pt-2 border-t border-gray-300">
            <span></span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          
          {savings > 0 && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md text-center text-sm">
              Saving ₹{savings.toFixed(0)}
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
