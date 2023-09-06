import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import { RoutingPropsOfSchedule } from "../../router/app/Schedule/types";

import { FormData, formValidation } from "./validate";

export const useSchedule = (scheduleRoute: RoutingPropsOfSchedule<"top">) => {
  const [isOpenCreateSchedule, setIsOpenCreateSchedule] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isOpenDate, setIsOpenDate] = useState(false);

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
    const values = getValues();
    const error = formValidation(values);

    if (error !== null) {
      error.title && setError("title", { message: error.title });
      error.date && setError("date", { message: error.date });
      error.oshiName && setError("oshiName", { message: error.oshiName });
      error.memo && setError("memo", { message: error.memo });
      return;
    }

    setIsOpenCreateSchedule(false);
    reset();
  };

  const onPressCompleteForDate = useCallback(async (date: Dayjs) => {
    setIsOpenDate(false);
    setCurrentDate(date);
  }, []);

  const onPressCancel = () => {
    setIsOpenCreateSchedule(false);
  };

  const onPressCancelForDate = () => {
    setIsOpenDate(false);
  };

  const onPressDate = () => {
    scheduleRoute.navigation.navigate("date");
  };

  const openCreateScheduleModal = () => {
    reset();
    setIsOpenCreateSchedule(true);
  };

  return {
    control,
    clearErrors,
    onPressDate,
    createScheduleContent: {
      isOpenCreateSchedule,
      openCreateScheduleModal,
      onPressComplete,
      onPressCancel,
    },
    filetrContent: {
      isOpenFilter,
      setIsOpenFilter,
    },
    editDateContent: {
      isOpenDate,
      currentDate,
      setIsOpenDate,
      onPressCompleteForDate,
      onPressCancelForDate,
    },
  };
};
