
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BillDrawerProps {
  subtotal: number;
  savings?: number;
  deliveryCharge?: number;
  tax?: number;
  totalAmount: number;
}

export const BillDrawer = ({
  subtotal,
  savings = 200,
  deliveryCharge = 0,
  tax = 0,
  totalAmount
}: BillDrawerProps) => {
  const handlingCharges = [
    { label: "Handling charge", original: 27, final: 11.99 },
    { label: "Handling charge", original: 27, final: 11.99 },
    { label: "Handling charge", original: 27, final: 11.99 },
  ];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="w-full flex justify-between items-center py-4">
          <span className="text-lg font-semibold">View order summary</span>
          <ChevronDown size={20} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Bill Details</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 space-y-4">
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
              <span>Total Amount</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
            
            {savings > 0 && (
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md text-center text-sm">
                Saving ₹{savings.toFixed(0)}
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
