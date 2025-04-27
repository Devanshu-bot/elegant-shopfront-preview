
import { useState } from "react";
import { Check, ChevronRight, MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface Address {
  id: string;
  name: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  isDefault?: boolean;
}

// This is a mock - in a real app this would come from the backend
const sampleAddresses: Address[] = [
  {
    id: '1',
    name: 'Home',
    line1: '666 Infernal Lane',
    line2: 'Underworld District',
    city: 'Abyssal Depths',
    state: 'Hades',
    isDefault: true
  },
  {
    id: '2',
    name: 'Work',
    line1: '123 Corporate Park',
    line2: 'Suite 400',
    city: 'Business City',
    state: 'Commerce'
  }
];

export const AddressSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address>(sampleAddresses.find(addr => addr.isDefault) || sampleAddresses[0]);
  
  const formatAddress = (address: Address) => {
    return `${address.line1}, ${address.line2}, ${address.city}, ${address.state}`;
  };
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <div className="p-4 bg-gray-50">
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between cursor-pointer">
            <div className="flex items-start">
              <MapPin className="mt-1 mr-2 h-5 w-5 text-gray-500 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold flex items-center">
                  <span>Delivering to</span>
                  <span className="ml-2 text-sm bg-gray-200 px-2 py-0.5 rounded">{selectedAddress.name}</span>
                </h3>
                <p className="text-gray-600 mt-1 text-sm">
                  {formatAddress(selectedAddress)}
                </p>
              </div>
            </div>
            <ChevronRight className={cn("h-5 w-5 text-gray-400 transition-transform", isOpen && "rotate-90")} />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-3">
          <div className="bg-white rounded-md shadow-sm">
            {sampleAddresses.map(address => (
              <div 
                key={address.id}
                onClick={() => {
                  setSelectedAddress(address);
                  setIsOpen(false);
                }}
                className={cn(
                  "p-3 flex items-start border-b last:border-b-0 cursor-pointer",
                  selectedAddress.id === address.id ? "bg-gray-50" : ""
                )}
              >
                <div className={cn(
                  "w-5 h-5 rounded-full border mr-3 mt-0.5 flex-shrink-0",
                  selectedAddress.id === address.id ? "bg-black border-black" : "bg-white border-gray-300"
                )}>
                  {selectedAddress.id === address.id && <Check size={14} className="text-white m-auto" />}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{address.name}</span>
                    {address.isDefault && (
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">Default</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{formatAddress(address)}</p>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full flex items-center justify-center p-3 text-sm text-gray-600 hover:bg-gray-50">
              <Plus size={16} className="mr-2" />
              Add a new address
            </Button>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};
