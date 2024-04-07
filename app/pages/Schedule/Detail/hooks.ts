import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { useCallback } from "react";

import { useUserStore } from "../../../store/user";
import {
  createSchedule,
  deleteConnectedSchedule,
  getConnectedSchedule,
} from "../../../api/schedules";
import { Params, RoutingPropsOfSchedule } from "../../../router/app/Schedule/types";
import { oshiId } from "../../../model/oshis";
import { artistId } from "../../../model/artists";
import { DEFAULT_MESSAGE } from "../../../api";
import { useQuery } from "../../../query";

export const useScheduleDetail = (
  scheduleRoute: RoutingPropsOfSchedule<"appScheduleDetail">,
  param: Params,
) => {
  const userId = useUserStore((props) => props.userId);

  const { data: isConnected } = useQuery(
    ["getConnectedSchedule"],
    async () => {
      if (param.id === null) return false;

      const { data } = await getConnectedSchedule({
        userId,
        connectedScheduleId: param.id,
      });

      return data !== null;
    },
    {
      enabled: param.calendarType === "others",
    },
  );

  const createScheduleMutation = useMutation({
    mutationFn: async () => {
      const { error } = await createSchedule({
        userId,
        oshiId: oshiId(param.oshiId),
        artistId: artistId(param.artistId),
        connectedScheduleId: param.id,
        title: param.title,
        isPublic: param.isPublic,
        startAt: param.startDate,
        endAt: param.endDate,
        memo: param.memo || "",
      });

      if (error !== null) throw error;

      return userId;
    },
    onSuccess: () => {
      scheduleRoute.navigation.navigate("appScheduleTop", {
        date: param.date,
      });
    },
    onError: () => {
      Alert.alert(DEFAULT_MESSAGE);
    },
  });

  const deleteConnectedScheduleMutationForOthers = useMutation({
    mutationFn: async () => {
      if (param.id === null) return;

      const { error } = await deleteConnectedSchedule({
        userId,
        connectedScheduleId: param.id,
      });

      if (error !== null) throw error;

      return userId;
    },
    onSuccess: (data) => {
      if (!data) return;
      scheduleRoute.navigation.navigate("appScheduleTop", {
        date: param.date,
      });
    },
    onError: () => {
      Alert.alert(DEFAULT_MESSAGE);
    },
  });

  const deleteConnectedScheduleMutationForMe = useMutation({
    mutationFn: async () => {
      if (param.connectedScheduleId === null) return;

      const { error } = await deleteConnectedSchedule({
        userId,
        connectedScheduleId: param.connectedScheduleId,
      });

      if (error !== null) throw error;

      return userId;
    },
    onSuccess: (data) => {
      if (!data) return;
      scheduleRoute.navigation.navigate("appScheduleTop", {
        date: param.date,
      });
    },
    onError: () => {
      Alert.alert(DEFAULT_MESSAGE);
    },
  });

  const onPressConnectedButton = useCallback(() => {
    if (isConnected) {
      deleteConnectedScheduleMutationForOthers.mutate();
    } else {
      createScheduleMutation.mutate();
    }
  }, [createScheduleMutation, deleteConnectedScheduleMutationForOthers, isConnected]);

  return {
    isConnected,
    isLoading: createScheduleMutation.isPending,
    onPressConnectedButton,
    onPressUnConnectedButtonForMe: deleteConnectedScheduleMutationForMe.mutate,
  };
};
