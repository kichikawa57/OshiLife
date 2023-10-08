import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Alert } from "react-native";

import { DEFAULT_MESSAGE, setSettion, signin } from "../../api";
import { RoutingPropsOfRoot } from "../../router/types";

import { FormData, formValidation } from "./validate";

export const useLogin = (rootRoute: RoutingPropsOfRoot<"login">) => {
  const { control, clearErrors, getValues, setError } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const setSettionMutation = useMutation(
    async ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
      const { data, error } = await setSettion({ accessToken, refreshToken });

      if (error !== null) throw error;

      return data;
    },
    {
      onSuccess: () => {
        rootRoute.navigation.reset({ index: 0, routes: [{ name: "app" }] });
      },
      onError: () => {
        Alert.alert(DEFAULT_MESSAGE);
      },
    },
  );

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
        if (!data || data.session === null || data.user === null) return;

        setSettionMutation.mutate({
          accessToken: data.session.access_token,
          refreshToken: data.session.refresh_token,
        });
      },
      onError: () => {
        Alert.alert("メールアドレス、パスワードのどちらかが間違っています");
      },
    },
  );

  return {
    isLoading: singinMutation.isLoading || setSettionMutation.isLoading,
    control,
    clearErrors,
    onPress: singinMutation.mutate,
  };
};
