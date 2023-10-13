import { useCallback, useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Alert } from "react-native";

import { RoutingPropsOfSchedule } from "../../router/app/Schedule/types";
import { getSchedulesForMe, getSchedulesForOthers } from "../../api/schedules";
import { useUserStore } from "../../store/user";
import { getCalendarBounds } from "../../shared/utils";
import { Schedules, convertOrigenalToModelForSchedule } from "../../model/schedules";
import { DEFAULT_MESSAGE } from "../../api";
import { useQuery, useQueryClient } from "../../query";
import { CalendarType } from "../../shared/types/components/schedules";

export const useSchedule = (scheduleRoute: RoutingPropsOfSchedule<"top">) => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isOpenDate, setIsOpenDate] = useState(false);
  const [calendarTypeIndex, setCalendarTypeIndex] = useState(0);

  const { setQueryData, getQueryData } = useQueryClient();

  const userId = useUserStore((props) => props.userId);

  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

  const schedulesForMe = useQuery(
    ["getScheduleForMe", currentDate.format("YYYY-MM")],
    async () => {
      const { start, end } = getCalendarBounds(currentDate);

      const { data, error } = await getSchedulesForMe({
        userId,
        startAt: start,
        endAt: end,
      });

      if (error !== null) throw error;

      return data.map<Schedules>((schedule) => {
        return convertOrigenalToModelForSchedule(
          {
            ...schedule,
            is_public: false,
            user_id: userId,
            updated_at: "",
            deleted_at: "",
          },
          schedule.artists,
          schedule.oshis,
        );
      });
    },
    {
      onError: () => {
        Alert.alert(DEFAULT_MESSAGE);
      },
    },
  );

  const schedulesForOthers = useQuery(
    ["getScheduleAtDateForOthers", currentDate.format("YYYY-MM")],
    async () => {
      const { start, end } = getCalendarBounds(currentDate);

      const oshis = getQueryData("getOshis");

      const { data, error } = await getSchedulesForOthers({
        userId,
        startAt: start,
        endAt: end,
        artistIds: oshis ? oshis.map((oshi) => oshi.artist_id) : [],
      });

      if (error !== null) throw error;

      return data.map<Schedules>((schedule) => {
        return convertOrigenalToModelForSchedule(
          {
            ...schedule,
            is_public: false,
            user_id: userId,
            updated_at: "",
            deleted_at: "",
          },
          schedule.artists,
          schedule.oshis,
        );
      });
    },
    {
      onError: () => {
        Alert.alert(DEFAULT_MESSAGE);
      },
    },
  );

  const onPressNextButton = useCallback(() => {
    setCurrentDate((props) => props.add(1, "month"));
  }, []);

  const onPressPrevButton = useCallback(() => {
    setCurrentDate((props) => props.add(-1, "month"));
  }, []);

  const onPressCurrentDate = useCallback(() => {
    setCurrentDate(dayjs());
  }, []);

  const onPressCompleteForDate = useCallback(async (date: Dayjs) => {
    setIsOpenDate(false);
    setCurrentDate(date);
  }, []);

  const onPressCancelForDate = () => {
    setIsOpenDate(false);
  };

  const calendarType = useMemo<CalendarType>(() => {
    return calendarTypeIndex === 0 ? "me" : "others";
  }, [calendarTypeIndex]);

  const onPressDate = useCallback(
    (calendarDate: string, schedules: Schedules[]) => {
      setQueryData(
        [
          calendarType === "me" ? "getScheduleAtDateForMe" : "getScheduleAtDateForOthers",
          calendarDate,
        ],
        schedules,
      );

      scheduleRoute.navigation.navigate("date", {
        date: calendarDate,
        calendarType,
      });
    },
    [calendarType, scheduleRoute.navigation, setQueryData],
  );

  const isLoading = useMemo(() => {
    if (calendarType === "me") {
      return schedulesForMe.isLoading;
    } else {
      return schedulesForOthers.isLoading;
    }
  }, [calendarType, schedulesForMe.isLoading, schedulesForOthers.isLoading]);

  return {
    isLoading,
    schedulesForMe,
    schedulesForOthers,
    calendarTypeIndex,
    setCalendarTypeIndex,
    onPressDate,
    onPressNextButton,
    onPressPrevButton,
    onPressCurrentDate,
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
