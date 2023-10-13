import dayjs from "dayjs";
import { Alert } from "react-native";
import { useCallback } from "react";

import { useQuery, useQueryClient } from "../../../query";
import { getSchedulesForMe, getSchedulesForOthers } from "../../../api/schedules";
import { useUserStore } from "../../../store/user";
import { getDayRange } from "../../../shared/utils";
import { DEFAULT_MESSAGE, getOshis } from "../../../api";
import { convertOrigenalToModelForSchedule } from "../../../model/schedules";
import { OshiId, convertOrigenalToModelForOshi, getArtistOfOshi } from "../../../model/oshis";
import { CalendarType } from "../../../shared/types/components/schedules";

export const useScheduleDate = (date: string, calendarType: CalendarType) => {
  const userId = useUserStore((store) => store.userId);

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
          { ...schedule, is_public: true, updated_at: "", user_id: userId },
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

  const getArtistOfOshiById = useCallback(
    (oshiId: OshiId) => {
      if (!oshiData) return null;
      return getArtistOfOshi(oshiId, oshiData);
    },
    [oshiData],
  );

  return {
    data,
    isLoading: isLoadingOshiData || isLoading,
    getArtistOfOshiById,
  };
};
