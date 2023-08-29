import { useForm } from "react-hook-form";
import { useCallback, useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import dayjs, { Dayjs } from "dayjs";

import { RoutingPropsOfSchedule } from "../../router/app/Schedule/types";

import { FormData, formValidation } from "./validate";

export const useSchedule = (scheduleRoute: RoutingPropsOfSchedule<"top">) => {
  const ref = useRef<BottomSheetModal>(null);
  const filterRef = useRef<BottomSheetModal>(null);
  const dateRef = useRef<BottomSheetModal>(null);

  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

  const { control, clearErrors, getValues, setError, reset } = useForm<FormData>({
    defaultValues: {
      title: "",
      date: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      oshiName: "",
      memo: "",
    },
  });

  const onPressComplete = async () => {
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

    ref.current.close();
    reset();
  };

  const onPressCompleteForDate = useCallback(async (date: Dayjs) => {
    if (!dateRef.current) return;
    dateRef.current.dismiss();
    setCurrentDate(date);
  }, []);

  const onPressCancel = () => {
    if (!ref.current) return;
    ref.current.close();
  };

  const onPressCancelForFilter = () => {
    if (!filterRef.current) return;
    filterRef.current.close();
  };

  const onPressCancelForDate = () => {
    if (!dateRef.current) return;
    dateRef.current.close();
  };

  const onPressDate = () => {
    scheduleRoute.navigation.navigate("date");
  };

  const onChange = (index: number) => {
    if (!ref.current || index !== -1) return;
    reset();
  };

  return {
    ref,
    filterRef,
    dateRef,
    control,
    onChange,
    clearErrors,
    onPressComplete,
    onPressCancel,
    onPressCancelForFilter,
    onPressDate,
    editDateContent: {
      currentDate,
      onPressCompleteForDate,
      onPressCancelForDate,
    },
  };
};
