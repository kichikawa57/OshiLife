import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { Alert } from "react-native";

import { EditAndDetailParams, RoutingPropsOfOshi } from "../../../router/app/Oshi/types";
import { DEFAULT_MESSAGE, createOshi, updateOshi } from "../../../api";
import { artistId } from "../../../model/artists";
import { useUserStore } from "../../../store/user";
import { oshiId } from "../../../model/oshis";
import { useQueryClient } from "../../../query";

import { FormData, formValidation } from "./validate";

export const useOshiEdit = (
  oshiRoute: RoutingPropsOfOshi<"edit">,
  params: EditAndDetailParams | undefined,
) => {
  const [isOpenSelectedColorModal, setIsOpenSelectedColorModal] = useState(false);
  const [isOpenSelectedOshiModal, setIsOpenSelectedOshiModal] = useState(false);
  const [isEditColor, setIsEditColor] = useState(params?.isEditColor || false);
  const userId = useUserStore((store) => store.userId);
  const queryClient = useQueryClient();

  const { control, clearErrors, getValues, setError, setValue } = useForm<FormData>({
    defaultValues: {
      artistId: params?.artistId || "",
      image: params?.image || "",
      name: params?.name || "",
      color: params?.color || "",
      memo: params?.memo || "",
    },
  });

  const validationValues = useCallback(() => {
    const values = getValues();
    const validationError = formValidation(values);

    if (validationError !== null) {
      validationError.image && setError("image", { message: validationError.image });
      validationError.name && setError("name", { message: validationError.name });
      validationError.color && setError("color", { message: validationError.color });
      validationError.memo && setError("memo", { message: validationError.memo });
      return null;
    }

    return values;
  }, [getValues, setError]);

  const createOshiMutation = useMutation(
    async () => {
      const values = validationValues();

      if (values === null) return;

      const { error } = await createOshi({
        user_id: userId,
        artist_id: artistId(values.artistId),
        image_url: params?.image || "",
        color: values.color,
        memo: values.memo || null,
        is_edit_color: isEditColor,
      });

      if (error !== null) throw error;

      return values;
    },
    {
      onSuccess: (data) => {
        if (data === undefined) return;

        queryClient.removeQueries("getOshis");

        oshiRoute.navigation.goBack();
      },
      onError: () => {
        Alert.alert(DEFAULT_MESSAGE);
      },
    },
  );

  const updateOshiMutation = useMutation(
    async () => {
      const values = validationValues();

      if (values === null || !params) return;

      const { data, error } = await updateOshi(oshiId(params.id), {
        artist_id: artistId(values.artistId),
        image_url: params?.image || "",
        color: values.color,
        memo: values.memo || null,
        is_edit_color: isEditColor,
      });

      if (error !== null) throw error;

      return data;
    },
    {
      onSuccess: (data) => {
        if (data === undefined || params === undefined) return;
        const values = getValues();

        queryClient.removeQueries("getOshis");

        oshiRoute.navigation.navigate("detail", {
          id: params.id,
          name: values.name,
          artistId: values.artistId || "",
          image: values.image || "",
          color: values.color,
          memo: values.memo || "",
          isEditColor: isEditColor,
        });
      },
      onError: () => {
        Alert.alert(DEFAULT_MESSAGE);
      },
    },
  );

  const onPressComplete = useCallback(() => {
    if (params) {
      updateOshiMutation.mutate();
    } else {
      createOshiMutation.mutate();
    }
  }, [createOshiMutation, params, updateOshiMutation]);

  return {
    isLoading: createOshiMutation.isLoading || updateOshiMutation.isLoading,
    isOpenSelectedColorModal,
    isOpenSelectedOshiModal,
    control,
    isEditColor,
    setValue,
    setIsEditColor,
    clearErrors,
    setIsOpenSelectedColorModal,
    setIsOpenSelectedOshiModal,
    onPressComplete,
  };
};
