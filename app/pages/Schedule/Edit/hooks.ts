import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";

import { Params, RoutingPropsOfSchedule } from "../../../router/app/Schedule/types";
import { validateDateRange } from "../../../shared/validate";
import {
  createSchedule,
  updateAllConnectedSchedules,
  updateSchedule,
} from "../../../api/schedules";
import { useUserStore } from "../../../store/user";
import { oshiId } from "../../../model/oshis";
import { DEFAULT_MESSAGE } from "../../../api";
import { artistId } from "../../../model/artists";

import { FormData, formValidation } from "./validate";

export const useScheduleEdit = (
  scheduleRoute: RoutingPropsOfSchedule<"appScheduleEdit">,
  params: Params,
) => {
  const [isModal, setIsModal] = useState(false);
  const userId = useUserStore((props) => props.userId);

  const { control, clearErrors, getValues, setValue, setError, reset } = useForm<FormData>({
    defaultValues: {
      title: params.title || "",
      startDate: params.startDate || "",
      endDate: params.endDate || "",
      oshiId: params.oshiId || "",
      artistId: params.artistId || "",
      oshiName: params.oshiName || "",
      isPublic: params.isPublic,
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

  const createScheduleMutation = useMutation({
    mutationFn: async () => {
      const isValidate = validateScheduleData();

      if (!isValidate) return;

      const values = getValues();

      const { error } = await createSchedule({
        userId,
        oshiId: oshiId(values.oshiId),
        artistId: artistId(values.artistId),
        connectedScheduleId: null,
        title: values.title,
        isPublic: values.isPublic,
        startAt: values.startDate,
        endAt: values.endDate,
        memo: values.memo || "",
      });

      if (error !== null) throw error;

      return userId;
    },
    onSuccess: (data) => {
      if (!data) return;
      scheduleRoute.navigation.navigate("appScheduleTop", {
        date: params.date,
      });
    },
    onError: () => {
      Alert.alert(DEFAULT_MESSAGE);
    },
  });

  const updateScheduleMutation = useMutation({
    mutationFn: async () => {
      const isValidate = validateScheduleData();

      if (!isValidate || params.id === null) return;

      const values = getValues();

      const { error } = await updateSchedule({
        scheduleId: params.id,
        title: values.title,
        connectedScheduleId: null,
        isPublic: values.isPublic,
        startAt: values.startDate,
        endAt: values.endDate,
        memo: values.memo || "",
      });

      if (error !== null) throw error;

      return params;
    },
    onSuccess: (data) => {
      if (!data || data.id === null) return;
      const values = getValues();

      // コネクトしているスケジュールを全て変更
      updateAllConnectedSchedules({
        connectedScheduleId: data.id,
        title: values.title,
        isPublic: values.isPublic,
        startAt: values.startDate,
        endAt: values.endDate,
        memo: values.memo || "",
      });
      scheduleRoute.navigation.navigate("appScheduleDetail", {
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
        isPublic: values.isPublic,
        memo: values.memo,
      });
    },
    onError: () => {
      Alert.alert(DEFAULT_MESSAGE);
    },
  });

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
    isLoading: createScheduleMutation.isPending || updateScheduleMutation.isPending,
    isModal,
    control,
    setValue,
    clearErrors,
    onPressComplete,
    onPressCancel,
    setIsModal,
  };
};
