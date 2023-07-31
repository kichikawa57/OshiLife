import { useForm } from "react-hook-form";

import { FormData, formValidation } from "./validate";

export const useLogin = () => {
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
    }
  };

  return {
    control,
    clearErrors,
    onPress,
  };
};
