
import { ChevronRight } from "lucide-react";

interface ProfileMenuItemProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}

export function ProfileMenuItem({ icon: Icon, label, onClick }: ProfileMenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center space-x-3">
        <Icon className="h-5 w-5 text-gray-500" />
        <span className="text-gray-700">{label}</span>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </button>
  );
}
