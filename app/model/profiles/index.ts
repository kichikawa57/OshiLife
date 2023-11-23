import { Database } from "../../api/schema";

import { ProfileId, Profiles } from "./types";

export * from "./types";

export const profileId = (n: string) => n as ProfileId;

export const convertOrigenalToModelForProfile: (
  profile: Database["public"]["Tables"]["profiles"]["Row"],
) => Profiles = (profile: Database["public"]["Tables"]["profiles"]["Row"]) => {
  return {
    id: profileId(profile.id),
    email: profile.email,
    fcr_token: profile.fcr_token,
    sex: profile.sex as Profiles["sex"],
    name: profile.name,
    created_at: profile.created_at,
    updated_at: profile.updated_at,
    deleted_at: profile.deleted_at,
  };
};
