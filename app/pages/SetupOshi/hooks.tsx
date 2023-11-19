import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Alert } from "react-native";
import ImagePicker from "react-native-image-crop-picker";

import { RoutingPropsOfRoot } from "../../router/types";
import { DEFAULT_MESSAGE, createOshi, getUser } from "../../api";
import { artistId } from "../../model/artists";
import { useUserStore } from "../../store/user";
import { uploadImage } from "../../api/image";
import { onErrorImagePicker } from "../../shared/image-picker";

import { FormData, formValidation } from "./validate";

export const useSetupOshi = (rootRoute: RoutingPropsOfRoot<"setupOshi">) => {
  const userId = useUserStore((store) => store.userId);

  const [isOpenSelectedColorModal, setIsOpenSelectedColorModal] = useState(false);
  const [isEditColor, setIsEditColor] = useState(false);

  const [isOpenSelectedOshiModal, setIsOpenSelectedOshiModal] = useState(false);

  const { control, clearErrors, getValues, setValue, setError } = useForm<FormData>({
    defaultValues: {
      artistId: "",
      name: "",
      image: "",
      color: "",
      memo: "",
    },
  });

  const onPress = useMutation(
    async () => {
      const values = getValues();
      const validateError = formValidation(values);

      if (validateError !== null) {
        validateError.artistId && setError("artistId", { message: validateError.artistId });
        validateError.name && setError("name", { message: validateError.name });
        validateError.color && setError("color", { message: validateError.color });
        return;
      }

      const { error } = await createOshi({
        user_id: userId,
        artist_id: artistId(values.artistId),
        image_url: values.image || null,
        color: values.color,
        memo: values.memo || null,
        is_edit_color: isEditColor,
      });

      if (error !== null) throw error;

      return null;
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

  const validateSession = useMutation(
    async () => {
      const { error } = await getUser();

      if (error !== null) throw error;

      return null;
    },
    {
      onError: () => {
        Alert.alert("アクセス権限がありません", "", [
          {
            text: "OK",
            onPress: () => {
              rootRoute.navigation.reset({ index: 0, routes: [{ name: "login" }] });
            },
          },
        ]);
      },
    },
  );

  const uploadImageMutation = useMutation(
    async () => {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        cropperCancelText: "キャンセル",
        cropperChooseText: "選択",
      });

      if (!image.path) return;

      const { data, error } = await uploadImage(userId, image.path);

      if (error !== null) throw error;

      return data;
    },
    {
      onSuccess: (data) => {
        if (!data) return;
        setValue("image", data.publicUrl);
      },
      onError: onErrorImagePicker,
    },
  );

  useEffect(() => {
    validateSession.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    control,
    clearErrors,
    onPress: onPress.mutate,
    setValue,
    uploadImageMutation,
    editColor: {
      isModal: isOpenSelectedColorModal,
      isEditColor,
      setIsModal: setIsOpenSelectedColorModal,
      setIsEditColor,
    },
    selectedOshi: {
      isOpenSelectedOshiModal,
      setIsOpenSelectedOshiModal,
    },
  };
};
