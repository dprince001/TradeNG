import sellerAvatar from "@/app/assets/images/seller_avatar.png";

export interface MockSeller {
  id: string;
  name: string;
  avatar: typeof sellerAvatar;
  rating: number;
  itemsSold: number;
  verified: boolean;
}

export const mockTopSellers: MockSeller[] = [
  { id: "sarah-johnson", name: "Sarah Johnson", avatar: sellerAvatar, rating: 4.8, itemsSold: 32, verified: true },
  { id: "techhub-store", name: "TechHub Store", avatar: sellerAvatar, rating: 4.9, itemsSold: 58, verified: true },
  { id: "olamilekan-daniel", name: "Olamilekan Daniel", avatar: sellerAvatar, rating: 4.8, itemsSold: 12, verified: true },
  { id: "amaka-obi", name: "Amaka Obi", avatar: sellerAvatar, rating: 4.7, itemsSold: 21, verified: false },
];
