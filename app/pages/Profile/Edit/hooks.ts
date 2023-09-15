import { useForm } from "react-hook-form";
import { useState } from "react";

import { EditParams } from "../../../router/app/Profile/types";

import { FormData, formValidation } from "./validate";

export const useProfileEdit = (params: EditParams) => {
  const [isOpen, setIsOpen] = useState(false);

  const { control, clearErrors, getValues, setError, reset } = useForm<FormData>({
    defaultValues: {
      email: params.email,
    },
  });

  const onPressComplete = () => {
    const values = getValues();
    const error = formValidation(values);

    if (error !== null) {
      error.email && setError("email", { message: error.email });
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
    control,
    setIsOpen,
    clearErrors,
    onPressComplete,
    onPressCancel,
  };
};