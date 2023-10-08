import { Profiles } from "../../../model/profiles";
import { err, ok } from "../../helper";
import { supabase } from "../../init";

type SignupParams = {
  email: string;
  password: string;
  name: string;
  sex: Profiles["sex"];
};

export const signup = async (params: SignupParams) => {
  const data = await supabase.auth.signUp({
    email: params.email,
    password: params.password,
    options: {
      data: {
        name: params.name,
        sex: params.sex,
      },
    },
  });

  return data;
};
