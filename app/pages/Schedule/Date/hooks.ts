import { useForm } from "react-hook-form";
import { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import dayjs from "dayjs";

import { FormData, formValidation } from "./validate";

export const useScheduleDate = () => {
  const ref = useRef<BottomSheetModal>(null);

  const { control, clearErrors, getValues, setError, reset } = useForm<FormData>({
    defaultValues: {
      title: "",
      date: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      oshiName: "",
      memo: "",
    },
  });

  const onPressComplete = () => {
    if (!ref.current) return;

    const values = getValues();
    const error = formValidation(values);

    if (error !== null) {
      error.title && setError("title", { message: error.title });
      error.date && setError("date", { message: error.date });
      error.oshiName && setError("oshiName", { message: error.oshiName });
      error.memo && setError("memo", { message: error.memo });
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
