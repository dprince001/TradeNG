"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Container from "@/app/components/layout/Container";
import Button from "@/app/components/Button";
import CartIcon from "@/app/components/layout/CartIcon";
import NotificationIcon from "@/app/components/layout/NotificationIconComponent";
import MenuIcon from "@/app/assets/svgs/home/MenuIcon";
import SearchIcon from "@/app/assets/svgs/home/SearchIcon";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import useAuthGuard from "@/app/hooks/useAuthGuard";
import LoginRequiredModal from "@/app/components/auth/LoginRequiredModal";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/#categories" },
  { label: "Sell", href: "/list-item" },
];

interface SiteHeaderProps {
  cartCount?: number;
  notificationCount?: number;
  onCartClick?: () => void;
  onNotificationClick?: () => void;
  showSearch?: boolean;
}

const SiteHeader = ({
  cartCount = 0,
  notificationCount = 0,
  onCartClick,
  onNotificationClick,
  showSearch = true,
}: SiteHeaderProps) => {
  const router = useRouter();
  const { isLoggedIn } = useCurrentUser();
  const { guard, promptOpen, closePrompt } = useAuthGuard();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
      {promptOpen && <LoginRequiredModal onClose={closePrompt} />}

      <Container className="flex items-center justify-between gap-4 py-3.5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mdl:hidden"
            aria-label="Toggle menu"
          >
            <MenuIcon />
          </button>

          <Link href="/" className="text-text-primary font-bold text-lg tracking-tight">
            Trade<span className="text-primary">NG</span>
          </Link>
        </div>

        <nav className="hidden mdl:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {showSearch && (
          <div className="hidden mdl:flex flex-1 max-w-md items-center gap-2.5 bg-[#F5F6FA] rounded-lg px-4 py-2.5">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search for anything..."
              className="bg-transparent outline-none text-sm text-text-primary placeholder:text-text-secondary w-full"
            />
          </div>
        )}

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => guard(() => onNotificationClick?.())}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
            aria-label="Notifications"
          >
            <NotificationIcon color="#1D1E20" count={isLoggedIn ? notificationCount : 0} />
          </button>
          <button
            onClick={() => guard(() => (onCartClick ? onCartClick() : router.push("/confirm-order")))}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
            aria-label="Cart"
          >
            <CartIcon color="#1D1E20" count={isLoggedIn ? cartCount : 0} />
          </button>

          <div className="hidden mdl:flex items-center gap-2.5">
            {isLoggedIn ? (
              <button
                onClick={() => router.push("/profile")}
                className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm"
                aria-label="Profile"
              >
                U
              </button>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => router.push("/login")}>
                  Log In
                </Button>
                <Button size="sm" onClick={() => router.push("/onboarding")}>
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>

      {menuOpen && (
        <div className="mdl:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-text-primary text-sm font-medium py-2.5 px-2 rounded-lg hover:bg-gray-50"
            >
              {link.label}
            </Link>
          ))}
          {isLoggedIn ? (
            <Link
              href="/profile"
              onClick={() => setMenuOpen(false)}
              className="text-text-primary text-sm font-medium py-2.5 px-2 rounded-lg hover:bg-gray-50"
            >
              My Profile
            </Link>
          ) : (
            <div className="flex gap-2.5 pt-2">
              <Button
                fullWidth
                variant="secondary"
                size="sm"
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/login");
                }}
              >
                Log In
              </Button>
              <Button
                fullWidth
                size="sm"
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/onboarding");
                }}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
