import { useForm } from "react-hook-form";
import { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { FormData, formValidation } from "./validate";

export const useOshi = () => {
  const ref = useRef<BottomSheetModal>(null);

  const { control, clearErrors, getValues, setError, reset } = useForm<FormData>({
    defaultValues: {
      email: "",
    },
  });

  const onPressComplete = () => {
    if (!ref.current) return;

    const values = getValues();
    const error = formValidation(values);

    if (error !== null) {
      error.email && setError("email", { message: error.email });
      return;
    }

    reset();
    ref.current.close();
  };

  const onPressCancel = () => {
    if (!ref.current) return;
    ref.current.close();
    reset();
  };

  const onChange = (index: number) => {
    if (!ref.current || index !== -1) return;
    reset();
  };

  return {
    ref,
    control,
    onChange,
    clearErrors,
    onPressComplete,
    onPressCancel,
  };
};
