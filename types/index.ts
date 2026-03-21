export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
}

export interface CreatorStats {
  platform: "instagram" | "telegram" | "youtube";
  followers: number;
  engagement: number;
  growth: number;
}

export interface BrandDeal {
  id: string;
  title: string;
  brand: string;
  status: "open" | "applied" | "closed";
}
