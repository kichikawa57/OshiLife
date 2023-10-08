import { supabase } from "../../init";

type SetSettionParams = {
  accessToken: string;
  refreshToken: string;
};

export const setSettion = async (params: SetSettionParams) => {
  const data = await supabase.auth.setSession({
    access_token: params.accessToken,
    refresh_token: params.refreshToken,
  });

  return data;
};

export const getUser = async (token?: string) => {
  const data = await supabase.auth.getUser(token ? token : undefined);

  return data;
};

export const getSettion = async () => {
  const data = await supabase.auth.getSession();

  return data;
};
