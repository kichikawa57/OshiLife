import React, { useEffect } from "react";
import dayjs from "dayjs";
import { Alert } from "react-native";
import { useCallback, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { useQuery, useQueryClient } from "../../../query";
import { deleteSchedule, getSchedulesForMe, getSchedulesForOthers } from "../../../api/schedules";
import { useUserStore } from "../../../store/user";
import { getDayRange } from "../../../shared/utils";
import { DEFAULT_MESSAGE, getOshis } from "../../../api";
import { ScheduleId, convertOrigenalToModelForSchedule } from "../../../model/schedules";
import { convertOrigenalToModelForOshi, getArtistOfOshi } from "../../../model/oshis";
import { CalendarType } from "../../../shared/types/components/schedules";
import { CheckBoxItem } from "../../../components/CheckBox/Item";
import { ArtistId } from "../../../model/artists";

export const useScheduleDate = (date: string, calendarType: CalendarType) => {
  const userId = useUserStore((store) => store.userId);

  const [displayedOshis, setDisplayedOshis] = useState<ArtistId[] | null>(null);

  const { getQueryData, removeQueries } = useQueryClient();

  const { data, isLoading, isError } = useQuery(
    [
      calendarType === "me"
        ? ["getScheduleAtDateForMe", date]
        : ["getScheduleAtDateForOthers", date],
    ],
    async () => {
      const { startOfDay, endOfDay } = getDayRange(dayjs(date));

      const oshis = getQueryData(["getOshis"]);

      const getSchedules =
        calendarType === "me"
          ? getSchedulesForMe({
              userId,
              startAt: startOfDay,
              endAt: endOfDay,
            })
          : getSchedulesForOthers({
              userId,
              startAt: startOfDay,
              endAt: endOfDay,
              artistIds: oshis ? oshis.map((oshi) => oshi.artist_id) : [],
            });

      const { data, error } = await getSchedules;

      if (error !== null) throw error;

      return data.map((schedule) =>
        convertOrigenalToModelForSchedule(
          { ...schedule, updated_at: "", user_id: userId },
          schedule.artists,
          schedule.oshis,
        ),
      );
    },
  );

  useEffect(() => {
    if (!isError) return;

    Alert.alert(DEFAULT_MESSAGE);
  }, [isError]);

  const isExisted = data !== undefined && data.length > 0;

  const {
    data: oshiData,
    isLoading: isLoadingOshiData,
    isError: isErrorOshiData,
  } = useQuery(["getOshis"], async () => {
    const { data, error } = await getOshis(userId);

    if (error !== null) throw error;

    return data.map((oshi) =>
      convertOrigenalToModelForOshi(
        { ...oshi, created_at: "", updated_at: "", user_id: userId },
        oshi.artists,
      ),
    );
  });

  useEffect(() => {
    if (!isErrorOshiData) return;

    Alert.alert(DEFAULT_MESSAGE);
  }, [isErrorOshiData]);

  const deleteScheduleMutation = useMutation({
    mutationFn: async ({ id }: { id: ScheduleId }) => {
      const { error } = await deleteSchedule(id);

      if (error !== null) throw error;

      return id;
    },
    onSuccess: () => {
      removeQueries([["getScheduleAtDateForMe", dayjs(date).format("YYYY-MM-DD")]]);
    },
    onError: () => {
      Alert.alert(DEFAULT_MESSAGE);
    },
  });

  const scheduleData = useMemo(() => {
    if (!data) return [];
    if (displayedOshis === null) return data;

    return data.filter((schedule) =>
      displayedOshis.some((displayedOshi) => displayedOshi === schedule.artist_id),
    );
  }, [data, displayedOshis]);

  const getArtistOfOshiById = useCallback(
    (artistId: ArtistId) => {
      if (!oshiData) return null;
      return getArtistOfOshi(artistId, oshiData);
    },
    [oshiData],
  );

  const updateDisplayedOshis = useCallback(
    (artistId: ArtistId) => {
      setDisplayedOshis((props) => {
        const oshis = getQueryData(["getOshis"]);
        if (props === null) {
          return oshis?.map((oshi) => oshi.artist_id).filter((id) => id !== artistId) || [];
        }

        if (props.some((prop) => prop === artistId)) {
          return props.filter((prop) => prop !== artistId);
        } else {
          return [...props, artistId];
        }
      });
    },
    [getQueryData],
  );

  const checkBoxItems = useMemo(() => {
    if (!oshiData || !data) return null;

    return oshiData
      .filter((oshi) => {
        return data.some((schedule) => schedule.artist_id === oshi.artist_id);
      })
      .map((oshi) => {
        const isSelected =
          displayedOshis === null ||
          displayedOshis.some((displayedOshi) => displayedOshi === oshi.artist_id);

        return (
          <CheckBoxItem
            key={oshi.id}
            imageUrl={oshi.image_url ?? ""}
            isSelected={isSelected}
            name={oshi.artists?.name ?? ""}
            onPress={() => updateDisplayedOshis(oshi.artist_id)}
            isMarginRight
          />
        );
      });
  }, [data, displayedOshis, oshiData, updateDisplayedOshis]);

  return {
    isExisted,
    scheduleData,
    isLoading: isLoadingOshiData || isLoading,
    checkBoxItems,
    getArtistOfOshiById,
    deleteScheduleMutation,
  };
};
