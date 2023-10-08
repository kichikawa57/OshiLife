import { create } from "zustand";

type SheardStore = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const useSharedStore = create<SheardStore>((set) => ({
  isLoading: true,
  setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),
}));
