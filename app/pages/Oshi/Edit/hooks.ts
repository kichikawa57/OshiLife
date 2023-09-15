import { useForm } from "react-hook-form";
import { useState } from "react";

import { EditParams } from "../../../router/app/Oshi/types";

import { FormData, formValidation } from "./validate";

export const useOshiEdit = (params: EditParams) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditColor, setIsEditColor] = useState(params?.isEditColor || false);

  const { control, clearErrors, getValues, setError, reset } = useForm<FormData>({
    defaultValues: {
      image: params?.image || "",
      name: params?.name || "",
      color: params?.color || "",
      memo: params?.memo || "",
    },
  });

  const onPressComplete = () => {
    const values = getValues();
    const error = formValidation(values);

    if (error !== null) {
      error.image && setError("image", { message: error.image });
      error.name && setError("name", { message: error.name });
      error.color && setError("color", { message: error.color });
      error.memo && setError("memo", { message: error.memo });
      return;
    }

    reset();
  };

  return {
    isOpen,
    control,
    isEditColor,
    setIsEditColor,
    clearErrors,
    setIsOpen,
    onPressComplete,
  };
};
