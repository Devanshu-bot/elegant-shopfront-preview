
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  ShoppingBag, 
  MapPin, 
  CreditCard, 
  User, 
  HeadphonesIcon, 
  Heart,
  ChevronRight,
  LogOut
} from "lucide-react";
import { useUserStore } from "@/store/useUserStore";

const ProfileMenuItem = ({ 
  icon: Icon, 
  label, 
  onClick 
}: { 
  icon: any, 
  label: string, 
  onClick: () => void 
}) => (
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

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const menuItems = [
    { icon: ShoppingBag, label: "Orders", path: "/orders" },
    { icon: MapPin, label: "Addresses", path: "/addresses" },
    { icon: CreditCard, label: "Payments", path: "/payments" },
    { icon: User, label: "Profile Info", path: "/profile-info" },
    { icon: HeadphonesIcon, label: "Customer Support", path: "/support" },
    { icon: Heart, label: "Wishlist", path: "/wishlist" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="p-6 flex items-center space-x-4 border-b border-gray-100">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>{user?.fullName?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {user?.fullName || "User"}
              </h1>
              <p className="text-gray-500 flex items-center mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {user?.location || "Location not set"}
              </p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="divide-y divide-gray-100">
            {menuItems.map((item) => (
              <ProfileMenuItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                onClick={() => navigate(item.path)}
              />
            ))}
          </div>

          {/* Logout */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={() => navigate("/auth/login")}
              className="flex items-center text-red-600 hover:text-red-700"
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
