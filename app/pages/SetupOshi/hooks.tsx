import { useForm } from "react-hook-form";
import { useState } from "react";

import { RoutingPropsOfRoot } from "../../router/types";

import { FormData, formValidation } from "./validate";

export const useSetupOshi = (rootRoute: RoutingPropsOfRoot<"setupOshi">) => {
  const [isOpenSelectedColorModal, setIsOpenSelectedColorModal] = useState(false);
  const [isEditColor, setIsEditColor] = useState(false);

  const [isOpenSelectedOshiModal, setIsOpenSelectedOshiModal] = useState(false);

  const { control, clearErrors, getValues, setError } = useForm<FormData>({
    defaultValues: {
      image: "",
      name: "",
      color: "",
      memo: "",
    },
  });

  const onPress = () => {
    const values = getValues();
    const error = formValidation(values);

    if (error !== null) {
      error.name && setError("name", { message: error.name });
      error.color && setError("color", { message: error.color });
      return;
    }

    rootRoute.navigation.reset({ index: 0, routes: [{ name: "app" }] });
  };

  return {
    control,
    clearErrors,
    onPress,
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
