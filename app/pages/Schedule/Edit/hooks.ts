import { useForm } from "react-hook-form";
import { useState } from "react";
import dayjs from "dayjs";

import { EditParams } from "../../../router/app/Schedule/types";

import { FormData, formValidation } from "./validate";

export const useScheduleDetail = (params: EditParams) => {
  const [isModal, setIsModal] = useState(false);

  const { control, clearErrors, getValues, setError, reset } = useForm<FormData>({
    defaultValues: {
      title: params?.title || "",
      date: params?.date || dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      oshiName: params?.oshiName || "",
      memo: params?.memo || "",
    },
  });

  const onPressComplete = () => {
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
    setIsModal(false);
  };

  const onPressCancel = () => {
    setIsModal(false);
    reset();
  };

  return {
    isModal,
    control,
    clearErrors,
    onPressComplete,
    onPressCancel,
    setIsModal,
  };
};