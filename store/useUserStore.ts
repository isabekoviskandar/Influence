import { create } from "zustand";

interface UserState {
  user: any | null;
  plan: string | null;
  setUser: (user: any) => void;
  setPlan: (plan: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  plan: null,
  setUser: (user) => set({ user }),
  setPlan: (plan) => set({ plan }),
  logout: () => set({ user: null, plan: null }),
}));
