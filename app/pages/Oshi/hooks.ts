import { useForm } from "react-hook-form";
import { useState } from "react";

import { FormData, formValidation } from "./validate";

export const useOshi = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenColor, setIsOpenColor] = useState(false);
  const [isSelectedEdit, setIsSelectedEdit] = useState(false);

  const { control, clearErrors, getValues, setError, reset } = useForm<FormData>({
    defaultValues: {
      image: "",
      name: "",
      color: "",
      memo: "",
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
    setIsOpen(false);
  };

  const onPressCancel = () => {
    setIsOpen(false);
    reset();
  };

  return {
    isOpen,
    isOpenColor,
    isSelectedEdit,
    control,
    setIsOpen,
    clearErrors,
    onPressComplete,
    onPressCancel,
    setIsOpenColor,
    setIsSelectedEdit,
  };
};
