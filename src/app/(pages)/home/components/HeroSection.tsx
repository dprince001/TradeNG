"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Container from "@/app/components/layout/Container";
import Button from "@/app/components/Button";
import {
  Search,
  ShieldCheck,
  Star,
  ArrowRight,
  Lock,
  BadgeCheck,
} from "lucide-react";

const HeroSection = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    router.push(
      query ? `/listings?q=${encodeURIComponent(query)}` : "/listings",
    );
  };

  return (
    <section className="bg-brand-gradient">
      <Container className="py-12 sml:py-16 md:py-20 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
            <ShieldCheck className="w-3.5 h-3.5" strokeWidth={2} />
            Nigeria's escrow-protected marketplace
          </span>

          <h1 className="text-white text-3xl xsl:text-4xl md:text-5xl font-bold leading-tight tracking-tight mt-4">
            Buy and sell safely, right in your city.
          </h1>
          <p className="text-white/80 text-sm sml:text-base mt-4 max-w-md mx-auto md:mx-0">
            TradeNG connects buyers and sellers with escrow-protected payments —
            your money stays safe until you confirm delivery.
          </p>

          <div className="mt-7 flex flex-col sml:flex-row gap-3 max-w-lg mx-auto md:mx-0">
            <div className="flex-1 flex items-center gap-2.5 bg-white rounded-lg px-4 py-3.5">
              <Search
                className="w-[18px] h-[18px] text-text-secondary flex-shrink-0"
                strokeWidth={2}
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                type="text"
                placeholder="Search for phones, fashion, furniture..."
                className="bg-transparent outline-none text-sm text-text-primary placeholder:text-text-secondary w-full"
              />
            </div>
            <Button
              size="lg"
              onClick={handleSearch}
              className="whitespace-nowrap"
            >
              Search
            </Button>
          </div>

          <div className="mt-6 flex items-center justify-center md:justify-start gap-3">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 active:bg-white/80 shadow-sm inline-flex items-center gap-1.5 group"
              onClick={() => router.push("/listings")}
            >
              Browse Listings
              <ArrowRight
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </Button>
          </div>
        </div>

        <div className="hidden md:flex flex-1 justify-center relative">
          <div
            className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl"
            aria-hidden
          />

          <div className="relative w-full max-w-sm">
            <div className="bg-white rounded-3xl shadow-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-text-secondary text-xs font-medium">
                  Order #DEC-2024-001
                </span>
                <BadgeCheck className="w-4 h-4 text-primary" strokeWidth={2} />
              </div>

              <div className="relative w-full h-36 rounded-2xl overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGVsbCUyMHhwc3xlbnwwfHwwfHx8MA%3D%3D"
                  alt="iPhone 13 Pro Max"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 384px"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-primary font-bold text-[15px]">
                    iPhone 13 Pro Max
                  </p>
                  <p className="text-text-secondary text-xs mt-0.5">
                    TechHub Store
                  </p>
                </div>
                <span className="text-primary font-bold text-[15px]">
                  ₦450,000
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2 bg-[#FFF5F3] rounded-xl px-3 py-2.5">
                <Lock
                  className="w-4 h-4 text-primary flex-shrink-0"
                  strokeWidth={2}
                />
                <span className="text-primary text-xs font-medium">
                  Held securely in escrow
                </span>
              </div>
            </div>

            <div className="hidden lg:flex absolute -top-5 -right-6 bg-white rounded-2xl shadow-lg px-3 py-2.5 items-center gap-2.5 animate-fadeIn">
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                <ShieldCheck
                  className="w-4 h-4 text-green-600"
                  strokeWidth={2}
                />
              </div>
              <div>
                <p className="text-text-primary text-xs font-bold leading-tight">
                  Payment Secured
                </p>
                <p className="text-text-secondary text-[10px] mt-0.5">
                  100% Protected
                </p>
              </div>
            </div>

            <div className="hidden lg:flex absolute -bottom-5 -left-6 bg-white rounded-2xl shadow-lg px-3 py-2.5 items-center gap-2.5 animate-fadeIn">
              <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                <Star
                  className="w-4 h-4 text-amber-500 fill-amber-500"
                  strokeWidth={2}
                />
              </div>
              <div>
                <p className="text-text-primary text-xs font-bold leading-tight">
                  4.8/5 Rating
                </p>
                <p className="text-text-secondary text-[10px] mt-0.5">
                  from 2,300+ orders
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
