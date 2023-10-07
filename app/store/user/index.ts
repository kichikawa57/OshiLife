import { create } from "zustand";

import { ProfileId, profileId } from "../../model/profiles";

type UserStore = {
  userId: ProfileId;
  setUserId: (userId: ProfileId) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  userId: profileId(""),
  setUserId: (userId) => set(() => ({ userId })),
}));
