import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Alert } from "react-native";

import { DEFAULT_MESSAGE, signin } from "../../api";
import { RoutingPropsOfRoot } from "../../router/types";

import { FormData, formValidation } from "./validate";

export const useLogin = (rootRoute: RoutingPropsOfRoot<"login">) => {
  const { control, clearErrors, getValues, setError } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const singinMutation = useMutation(
    async () => {
      const values = getValues();
      const ValidationError = formValidation(values);

      if (ValidationError !== null) {
        ValidationError.email && setError("email", { message: ValidationError.email });
        ValidationError.password && setError("password", { message: ValidationError.password });
        return;
      }

      const { data } = await signin({ email: values.email, password: values.password });

      if (data.user === null || data.session === null) {
        throw new Error(DEFAULT_MESSAGE);
      }

      return data;
    },
    {
      onSuccess: (data) => {
        if (!data) return;
        rootRoute.navigation.reset({ index: 0, routes: [{ name: "app" }] });
      },
      onError: () => {
        Alert.alert("メールアドレス、パスワードのどちらかが間違っています");
      },
    },
  );

  return {
    isLoading: singinMutation.isLoading,
    control,
    clearErrors,
    onPress: singinMutation.mutate,
  };
};
