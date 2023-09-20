import { useForm } from "react-hook-form";
import { useState } from "react";

import { EditParams, RoutingPropsOfSchedule } from "../../../router/app/Schedule/types";
import { validateDateRange } from "../../../shared/validate";

import { FormData, formValidation } from "./validate";

export const useScheduleDetail = (
  scheduleRoute: RoutingPropsOfSchedule<"edit">,
  params: EditParams,
) => {
  const [isModal, setIsModal] = useState(false);

  const { control, clearErrors, getValues, setError, reset } = useForm<FormData>({
    defaultValues: {
      title: params?.title || "",
      startDate: params?.startDate || "",
      endDate: params?.endDate || "",
      oshiName: params?.oshiName || "",
      memo: params?.memo || "",
    },
  });

  const onPressComplete = () => {
    const values = getValues();
    const error = formValidation(values);

    if (error !== null) {
      error.title && setError("title", { message: error.title });
      error.startDate && setError("startDate", { message: error.startDate });
      error.endDate && setError("endDate", { message: error.startDate });
      error.oshiName && setError("oshiName", { message: error.oshiName });
      error.memo && setError("memo", { message: error.memo });
      return;
    }

    const errorTextAboutDateRange = validateDateRange({
      startDate: values.startDate,
      endDate: values.endDate,
    });

    if (errorTextAboutDateRange !== "") {
      setError("startDate", { message: errorTextAboutDateRange });
      setError("endDate", { message: errorTextAboutDateRange });
      return;
    }

    scheduleRoute.navigation.goBack();
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
