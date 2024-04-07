import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";

import { RoutingPropsOfRoot } from "../../router/types";
import { DEFAULT_MESSAGE, setSettion, signup } from "../../api";
import { useUserStore } from "../../store/user";
import { profileId } from "../../model/profiles";
import { SupabaseError } from "../../api/helper";

import { FormData, formValidation } from "./validate";

export const useSetupUser = (rootRoute: RoutingPropsOfRoot<"setupUser">) => {
  const setUserId = useUserStore((store) => store.setUserId);

  const { control, clearErrors, getValues, setError } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      sex: "",
      password: "",
    },
  });

  const setSettionMutation = useMutation({
    mutationFn: async ({
      accessToken,
      refreshToken,
    }: {
      accessToken: string;
      refreshToken: string;
    }) => {
      const { data, error } = await setSettion({
        accessToken,
        refreshToken,
      });

      if (error !== null) throw error;

      return data;
    },
    onSuccess: (data) => {
      if (data.user === null) return;

      setUserId(profileId(data.user.id));
      rootRoute.navigation.navigate("setupOshi");
    },
    onError: () => {
      Alert.alert(DEFAULT_MESSAGE);
    },
  });

  const signupMutation = useMutation({
    mutationFn: async () => {
      const values = getValues();
      const validationError = formValidation(values);

      if (validationError !== null) {
        validationError.name && setError("name", { message: validationError.name });
        validationError.email && setError("email", { message: validationError.email });
        validationError.sex && setError("sex", { message: validationError.sex });
        validationError.password && setError("password", { message: validationError.password });
        return;
      }

      if (values.sex === "") return;

      const { data, error } = await signup({
        name: values.name,
        email: values.email,
        sex: values.sex,
        password: values.password,
      });

      if (error !== null) throw error;

      return data;
    },
    onSuccess: (data) => {
      if (!data || data.session === null) return;

      setSettionMutation.mutate({
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
      });
    },
    onError: (error: SupabaseError) => {
      if (!error.code) {
        Alert.alert(DEFAULT_MESSAGE);
        return;
      }

      if (error.code && error.code === "400") {
        Alert.alert("既に登録されているメールアドレスです");
        return;
      }

      Alert.alert(DEFAULT_MESSAGE);
    },
  });

  return {
    control,
    clearErrors,
    onPress: signupMutation.mutate,
  };
};
