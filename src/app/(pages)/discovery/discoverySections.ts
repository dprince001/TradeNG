export interface DiscoverySectionMeta {
  title: string;
  description: string;
  emptyTitle: string;
  emptyMessage: string;
}

export const DISCOVERY_SECTIONS: Record<string, DiscoverySectionMeta> = {
  "best-selling": {
    title: "Best Selling",
    description: "Active listings ranked by buyer interest",
    emptyTitle: "No best-selling listings yet",
    emptyMessage: "Check back soon — new listings are added all the time.",
  },
  "featured-listings": {
    title: "Featured Listings",
    description: "Active listings from TradeNG's top sellers",
    emptyTitle: "No featured listings yet",
    emptyMessage: "Check back soon — new listings are added all the time.",
  },
  "verified-sellers": {
    title: "Listings From Verified Sellers",
    description: "Fresh listings from TradeNG's verified sellers",
    emptyTitle: "No listings from verified sellers yet",
    emptyMessage: "Check back soon — new listings are added all the time.",
  },
};

export type DiscoverySlug = keyof typeof DISCOVERY_SECTIONS;
