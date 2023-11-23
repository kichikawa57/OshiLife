import { ProfileId, Profiles } from "../../model/profiles";
import { DefaultRemoveTypeToUpdateRow } from "../helper";
import { supabase } from "../init";

export const getProfile = async (userId: ProfileId) => {
  const data = await supabase
    .from("profiles")
    .select("id, email, name, sex, fcr_token")
    .eq("id", userId)
    .is("deleted_at", null)
    .single();

  return data;
};

export const updateProfile = async (
  id: ProfileId,
  params: Partial<Omit<Profiles, DefaultRemoveTypeToUpdateRow>>,
) => {
  const data = await supabase.from("profiles").update(params).eq("id", id);

  return data;
};
