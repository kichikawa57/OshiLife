import { supabase } from "../../init";

export const signout = async () => {
  const data = await supabase.auth.signOut();

  return data;
};
