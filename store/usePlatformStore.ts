import { create } from "zustand";

interface PlatformState {
  selectedPlatform: "instagram" | "telegram" | "youtube";
  setSelectedPlatform: (platform: "instagram" | "telegram" | "youtube") => void;
}

export const usePlatformStore = create<PlatformState>((set) => ({
  selectedPlatform: "instagram",
  setSelectedPlatform: (platform) => set({ selectedPlatform: platform }),
}));
