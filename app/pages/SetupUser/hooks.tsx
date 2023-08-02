import { useForm } from "react-hook-form";

import { RoutingPropsOfRoot } from "../../router/types";

import { FormData, formValidation } from "./validate";

export const useSetupUser = (rootRoute: RoutingPropsOfRoot<"setupUser">) => {
  const { control, clearErrors, getValues, setError } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onPress = () => {
    const values = getValues();
    const error = formValidation(values);

    if (error !== null) {
      error.email && setError("email", { message: error.email });
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
