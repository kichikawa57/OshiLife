import { useMutation } from "react-query";
import dayjs from "dayjs";
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
import { useQuery, useQueryClient } from "../../../query";

export const useScheduleDetail = (
  scheduleRoute: RoutingPropsOfSchedule<"detail">,
  param: Params,
) => {
  const userId = useUserStore((props) => props.userId);

  const { removeQueries } = useQueryClient();

  const { data: isConnected, refetch } = useQuery(
    "getConnectedSchedule",
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

  const createScheduleMutation = useMutation(
    async () => {
      const { error } = await createSchedule({
        userId,
        oshiId: oshiId(param.oshiId),
        artistId: artistId(param.artistId),
        connectedScheduleId: param.id,
        title: param.title,
        isPublic: false,
        startAt: param.startDate,
        endAt: param.endDate,
        memo: param.memo || "",
      });

      if (error !== null) throw error;

      return userId;
    },
    {
      onSuccess: () => {
        removeQueries(["getScheduleForMe", dayjs(param.date).format("YYYY-MM")]);
        removeQueries(["getScheduleAtDateForMe", dayjs(param.date).format("YYYY-MM-DD")]);
        refetch();
      },
      onError: () => {
        Alert.alert(DEFAULT_MESSAGE);
      },
    },
  );

  const deleteConnectedScheduleMutationForOthers = useMutation(
    async () => {
      if (param.id === null) return;

      const { error } = await deleteConnectedSchedule({
        userId,
        connectedScheduleId: param.id,
      });

      if (error !== null) throw error;

      return userId;
    },
    {
      onSuccess: (data) => {
        if (!data) return;

        removeQueries(["getScheduleForMe", dayjs(param.date).format("YYYY-MM")]);
        removeQueries(["getScheduleAtDateForMe", dayjs(param.date).format("YYYY-MM-DD")]);
        removeQueries("getConnectedSchedule");
        refetch();
      },
      onError: () => {
        Alert.alert(DEFAULT_MESSAGE);
      },
    },
  );

  const deleteConnectedScheduleMutationForMe = useMutation(
    async () => {
      if (param.connectedScheduleId === null) return;

      const { error } = await deleteConnectedSchedule({
        userId,
        connectedScheduleId: param.connectedScheduleId,
      });

      if (error !== null) throw error;

      return userId;
    },
    {
      onSuccess: (data) => {
        if (!data) return;

        removeQueries(["getScheduleForMe", dayjs(param.date).format("YYYY-MM")]);
        removeQueries(["getScheduleAtDateForMe", dayjs(param.date).format("YYYY-MM-DD")]);
        removeQueries("getConnectedSchedule");
        scheduleRoute.navigation.goBack();
      },
      onError: () => {
        Alert.alert(DEFAULT_MESSAGE);
      },
    },
  );

  const onPressConnectedButton = useCallback(() => {
    if (isConnected) {
      deleteConnectedScheduleMutationForOthers.mutate();
    } else {
      createScheduleMutation.mutate();
    }
  }, [createScheduleMutation, deleteConnectedScheduleMutationForOthers, isConnected]);

  return {
    isConnected,
    isLoading: createScheduleMutation.isLoading,
    onPressConnectedButton,
    onPressUnConnectedButtonForMe: deleteConnectedScheduleMutationForMe.mutate,
  };
};
