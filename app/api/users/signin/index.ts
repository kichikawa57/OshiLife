import { supabase } from "../../init";

type SigninParams = {
  email: string;
  password: string;
};

export const signin = async (params: SigninParams) => {
  const res = await supabase.auth.signInWithPassword({
    email: params.email,
    password: params.password,
  });

  return res;
};
