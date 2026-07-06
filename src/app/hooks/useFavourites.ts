import { useState, useEffect } from "react";

export interface FavouriteProduct {
  id: string;
  title?: string;
  item_name?: string;
  start_price?: string;
  price?: string;
  images?: string[];
  seller?: {
    first_name: string;
    last_name: string;
    is_verified_seller: boolean;
  };
  negotiable?: boolean;
}

export const useFavourites = () => {
  const [favourites, setFavourites] = useState<FavouriteProduct[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("trade_ng_favourites");
    if (stored) {
      try {
        setFavourites(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse favourites", e);
      }
    }
  }, []);

  const toggleFavourite = (product: FavouriteProduct) => {
    setFavourites((prev) => {
      const isFav = prev.some((p) => p.id === product.id);
      let updated;
      if (isFav) {
        updated = prev.filter((p) => p.id !== product.id);
      } else {
        updated = [...prev, product];
      }
      localStorage.setItem("trade_ng_favourites", JSON.stringify(updated));
      window.dispatchEvent(new Event("favourites_updated"));
      return updated;
    });
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem("trade_ng_favourites");
      if (stored) {
        try {
          setFavourites(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse favourites", e);
        }
      } else {
        setFavourites([]);
      }
    };
    window.addEventListener("favourites_updated", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("favourites_updated", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const isFavourite = (id: string) => favourites.some((p) => p.id === id);

  return { favourites, toggleFavourite, isFavourite, mounted };
};
