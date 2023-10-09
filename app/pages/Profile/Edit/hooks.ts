import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "react-query";
import { Alert } from "react-native";

import { EditParams, RoutingPropsOfProfile } from "../../../router/app/Profile/types";
import { DEFAULT_MESSAGE, updateProfile } from "../../../api";
import { useUserStore } from "../../../store/user";
import { useQueryClient } from "../../../query";

import { FormData, formValidation } from "./validate";

export const useProfileEdit = (profileRoute: RoutingPropsOfProfile<"edit">, params: EditParams) => {
  const [isOpen, setIsOpen] = useState(false);
  const userId = useUserStore((store) => store.userId);

  const queryClient = useQueryClient();

  const { control, clearErrors, getValues, setValue, setError, reset } = useForm<FormData>({
    defaultValues: {
      name: params.name,
      email: params.email,
      sex: params.sex,
    },
  });

  const updateProfileMutation = useMutation(
    async () => {
      const values = getValues();
      const validateError = formValidation(values);

      if (validateError !== null) {
        validateError.name && setError("name", { message: validateError.name });
        validateError.email && setError("email", { message: validateError.email });
        validateError.sex && setError("sex", { message: validateError.sex });
        return;
      }

      if (values.sex === "") return;

      const { error } = await updateProfile(userId, {
        name: values.name,
        email: values.email,
        sex: values.sex,
      });

      if (error !== null) throw error;

      return userId;
    },
    {
      onSuccess: (data) => {
        if (!data) return;

        queryClient.removeQueries("getProfile");
        profileRoute.navigation.navigate("top");
      },
      onError: () => {
        Alert.alert(DEFAULT_MESSAGE);
      },
    },
  );

  const onPressCancel = () => {
    setIsOpen(false);
    reset();
  };

  return {
    isLoading: updateProfileMutation.isLoading,
    isOpen,
    control,
    setValue,
    setIsOpen,
    clearErrors,
    onPressComplete: updateProfileMutation.mutate,
    onPressCancel,
  };
};
