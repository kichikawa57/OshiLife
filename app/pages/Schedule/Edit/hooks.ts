import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { Alert } from "react-native";
import dayjs from "dayjs";

import { Params, RoutingPropsOfSchedule } from "../../../router/app/Schedule/types";
import { validateDateRange } from "../../../shared/validate";
import { createSchedule, updateSchedule } from "../../../api/schedules";
import { useUserStore } from "../../../store/user";
import { oshiId } from "../../../model/oshis";
import { DEFAULT_MESSAGE } from "../../../api";
import { useQueryClient } from "../../../query";
import { artistId } from "../../../model/artists";

import { FormData, formValidation } from "./validate";

export const useScheduleEdit = (scheduleRoute: RoutingPropsOfSchedule<"edit">, params: Params) => {
  const [isModal, setIsModal] = useState(false);
  const userId = useUserStore((props) => props.userId);
  const { removeQueries } = useQueryClient();

  const { control, clearErrors, getValues, setValue, setError, reset } = useForm<FormData>({
    defaultValues: {
      title: params.title || "",
      startDate: params.startDate || "",
      endDate: params.endDate || "",
      oshiId: params.oshiId || "",
      artistId: params.artistId || "",
      oshiName: params.oshiName || "",
      memo: params.memo || "",
    },
  });

  const validateScheduleData = () => {
    const values = getValues();
    const error = formValidation(values);

    if (error !== null) {
      error.title && setError("title", { message: error.title });
      error.startDate && setError("startDate", { message: error.startDate });
      error.endDate && setError("endDate", { message: error.startDate });
      error.oshiName && setError("oshiName", { message: error.oshiName });
      error.memo && setError("memo", { message: error.memo });
      return false;
    }

    const errorTextAboutDateRange = validateDateRange({
      startDate: values.startDate,
      endDate: values.endDate,
    });

    if (errorTextAboutDateRange !== "") {
      setError("startDate", { message: errorTextAboutDateRange });
      setError("endDate", { message: errorTextAboutDateRange });
      return false;
    }

    return true;
  };

  const createScheduleMutation = useMutation(
    async () => {
      const isValidate = validateScheduleData();

      if (!isValidate) return;

      const values = getValues();

      const { error } = await createSchedule({
        userId,
        oshiId: oshiId(values.oshiId),
        artistId: artistId(values.artistId),
        connectedScheduleId: null,
        title: values.title,
        isPublic: true,
        startAt: values.startDate,
        endAt: values.endDate,
        memo: values.memo || "",
      });

      if (error !== null) throw error;

      return userId;
    },
    {
      onSuccess: (data) => {
        if (!data) return;
        removeQueries(["getScheduleForMe", dayjs(params.date).format("YYYY-MM")]);
        removeQueries(["getScheduleAtDateForMe", dayjs(params.date).format("YYYY-MM-DD")]);
        scheduleRoute.navigation.goBack();
      },
      onError: () => {
        Alert.alert(DEFAULT_MESSAGE);
      },
    },
  );

  const updateScheduleMutation = useMutation(
    async () => {
      const isValidate = validateScheduleData();

      if (!isValidate || params.id === null) return;

      const values = getValues();

      const { error } = await updateSchedule({
        scheduleId: params.id,
        oshiId: oshiId(values.oshiId),
        title: values.title,
        connectedScheduleId: null,
        artistId: artistId(values.artistId),
        isPublic: true,
        startAt: values.startDate,
        endAt: values.endDate,
        memo: values.memo || "",
      });

      if (error !== null) throw error;

      return params;
    },
    {
      onSuccess: (data) => {
        if (!data) return;
        const values = getValues();
        removeQueries(["getScheduleForMe", dayjs(params.date).format("YYYY-MM")]);
        removeQueries(["getScheduleAtDateForMe", dayjs(params.date).format("YYYY-MM-DD")]);
        scheduleRoute.navigation.navigate("detail", {
          id: params.id,
          oshiId: values.oshiId,
          artistId: values.artistId,
          date: data.date,
          connectedScheduleId: null,
          calendarType: data.calendarType,
          oshiName: data.oshiName,
          endDate: values.endDate,
          startDate: values.startDate,
          title: values.title,
          memo: values.memo,
        });
      },
      onError: () => {
        Alert.alert(DEFAULT_MESSAGE);
      },
    },
  );

  const onPressComplete = useCallback(() => {
    if (params.id !== null) {
      updateScheduleMutation.mutate();
    } else {
      createScheduleMutation.mutate();
    }
  }, [createScheduleMutation, params, updateScheduleMutation]);

  const onPressCancel = () => {
    setIsModal(false);
    reset();
  };

  return {
    isLoading: createScheduleMutation.isLoading || updateScheduleMutation.isLoading,
    isModal,
    control,
    setValue,
    clearErrors,
    onPressComplete,
    onPressCancel,
    setIsModal,
  };
};
