"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutGrid, ShoppingBag, Wallet, Settings, User, MessageSquare, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { logOut } from "@/app/redux/api/appSlice";

const NAV_ITEMS = [
  { href: "/profile", label: "Overview", icon: User },
  { href: "/profile/listings", label: "My Listings", icon: LayoutGrid },
  { href: "/profile/orders", label: "My Orders", icon: ShoppingBag },
  { href: "/chat", label: "Chats", icon: MessageSquare },
  { href: "/profile/wallet", label: "Wallet", icon: Wallet },
  { href: "/profile/settings", label: "Settings", icon: Settings },
];

const ProfileSidebar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logOut());
    router.push("/login");
  };

  return (
    <aside className="hidden md:flex md:w-56 flex-shrink-0 flex-col gap-1">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive =
          pathname === item.href || (item.href === "/profile" && pathname === "/profile/edit");

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
              isActive ? "bg-primary/10 text-primary" : "text-text-secondary hover:bg-gray-100"
            )}
          >
            <Icon className="w-4 h-4" strokeWidth={1.8} />
            {item.label}
          </Link>
        );
      })}

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-red-500 hover:bg-red-50 w-full mt-2"
      >
        <LogOut className="w-4 h-4" strokeWidth={1.8} />
        Log Out
      </button>
    </aside>
  );
};

export default ProfileSidebar;
