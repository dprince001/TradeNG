import { LayoutGrid, ShoppingBag, Wallet, Settings, User } from "lucide-react";

export type ProfileView = "main" | "edit" | "listings" | "orders" | "wallet" | "settings";

const NAV_ITEMS: { key: ProfileView; label: string; icon: typeof User }[] = [
  { key: "main", label: "Overview", icon: User },
  { key: "listings", label: "My Listings", icon: LayoutGrid },
  { key: "orders", label: "My Orders", icon: ShoppingBag },
  { key: "wallet", label: "Wallet", icon: Wallet },
  { key: "settings", label: "Settings", icon: Settings },
];

interface ProfileSidebarProps {
  active: ProfileView;
  onSelect: (view: ProfileView) => void;
}

const ProfileSidebar = ({ active, onSelect }: ProfileSidebarProps) => {
  return (
    <aside className="hidden md:flex md:w-56 flex-shrink-0 flex-col gap-1">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.key || (active === "edit" && item.key === "main");

        return (
          <button
            key={item.key}
            onClick={() => onSelect(item.key)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              isActive ? "bg-primary/10 text-primary" : "text-text-secondary hover:bg-gray-100"
            }`}
          >
            <Icon className="w-4 h-4" strokeWidth={1.8} />
            {item.label}
          </button>
        );
      })}
    </aside>
  );
};

export default ProfileSidebar;
