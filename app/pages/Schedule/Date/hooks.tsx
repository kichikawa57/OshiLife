import React from "react";
import dayjs from "dayjs";
import { Alert } from "react-native";
import { useCallback, useMemo, useState } from "react";

import { useQuery, useQueryClient } from "../../../query";
import { getSchedulesForMe, getSchedulesForOthers } from "../../../api/schedules";
import { useUserStore } from "../../../store/user";
import { getDayRange } from "../../../shared/utils";
import { DEFAULT_MESSAGE, getOshis } from "../../../api";
import { convertOrigenalToModelForSchedule } from "../../../model/schedules";
import { OshiId, convertOrigenalToModelForOshi, getArtistOfOshi } from "../../../model/oshis";
import { CalendarType } from "../../../shared/types/components/schedules";
import { CheckBoxItem } from "../../../components/CheckBox/Item";

export const useScheduleDate = (date: string, calendarType: CalendarType) => {
  const userId = useUserStore((store) => store.userId);

  const [displayedOshis, setDisplayedOshis] = useState<OshiId[] | null>(null);

  const { getQueryData } = useQueryClient();

  const { data, isLoading } = useQuery(
    [calendarType === "me" ? "getScheduleAtDateForMe" : "getScheduleAtDateForOthers", date],
    async () => {
      const { startOfDay, endOfDay } = getDayRange(dayjs(date));

      const oshis = getQueryData("getOshis");

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
    {
      onError: () => {
        Alert.alert(DEFAULT_MESSAGE);
      },
    },
  );

  const { data: oshiData, isLoading: isLoadingOshiData } = useQuery(
    "getOshis",
    async () => {
      const { data, error } = await getOshis(userId);

      if (error !== null) throw error;

      return data.map((oshi) =>
        convertOrigenalToModelForOshi(
          { ...oshi, created_at: "", updated_at: "", user_id: userId },
          oshi.artists,
        ),
      );
    },
    {
      onError: () => {
        Alert.alert(DEFAULT_MESSAGE);
      },
    },
  );

  const scheduleData = useMemo(() => {
    if (!data) return [];
    if (displayedOshis === null) return data;

    return data.filter((schedule) =>
      displayedOshis.some((displayedOshi) => displayedOshi === schedule.oshi_id),
    );
  }, [data, displayedOshis]);

  const getArtistOfOshiById = useCallback(
    (oshiId: OshiId) => {
      if (!oshiData) return null;
      return getArtistOfOshi(oshiId, oshiData);
    },
    [oshiData],
  );

  const updateDisplayedOshis = useCallback(
    (oshiId: OshiId) => {
      setDisplayedOshis((props) => {
        const oshis = getQueryData("getOshis");
        if (props === null) {
          return oshis?.map((oshi) => oshi.id).filter((id) => id !== oshiId) || [];
        }

        if (props.some((prop) => prop === oshiId)) {
          return props.filter((prop) => prop !== oshiId);
        } else {
          return [...props, oshiId];
        }
      });
    },
    [getQueryData],
  );

  const checkBoxItems = useMemo(() => {
    if (!oshiData || !data) return null;

    return oshiData
      .filter((oshi) => {
        return data.some((schedule) => schedule.oshi_id === oshi.id);
      })
      .map((oshi) => {
        const isSelected =
          displayedOshis === null ||
          displayedOshis.some((displayedOshi) => displayedOshi === oshi.id);

        return (
          <CheckBoxItem
            key={oshi.id}
            imageUrl={oshi.image_url || ""}
            isSelected={isSelected}
            name={oshi.artists?.name || ""}
            onPress={() => updateDisplayedOshis(oshi.id)}
            isMarginRight
          />
        );
      });
  }, [data, displayedOshis, oshiData, updateDisplayedOshis]);

  return {
    scheduleData,
    isLoading: isLoadingOshiData || isLoading,
    checkBoxItems,
    getArtistOfOshiById,
  };
};
