import { useForm } from "react-hook-form";

import { RoutingPropsOfRoot } from "../../router/types";

import { FormData, formValidation } from "./validate";

export const useSetupUser = (rootRoute: RoutingPropsOfRoot<"setupUser">) => {
  const { control, clearErrors, getValues, setError } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      sex: "",
      password: "",
    },
  });

  const onPress = () => {
    const values = getValues();
    const error = formValidation(values);

    if (error !== null) {
      error.name && setError("name", { message: error.name });
      error.email && setError("email", { message: error.email });
      error.sex && setError("sex", { message: error.sex });
      error.password && setError("password", { message: error.password });
      return;
    }

    rootRoute.navigation.navigate("setupOshi");
  };

  return {
    control,
    clearErrors,
    onPress,
  };
};
