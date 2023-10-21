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
import { OshiId } from "../../model/oshis";

export const useSchedule = (scheduleRoute: RoutingPropsOfSchedule<"top">) => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isOpenDate, setIsOpenDate] = useState(false);
  const [calendarTypeIndex, setCalendarTypeIndex] = useState(0);
  const [displayedOshis, setDisplayedOshis] = useState<OshiId[] | null>(null);

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

  const updateDisplayedOshis = (oshiId: OshiId) => {
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
  };

  const schedulesForMeData = useMemo<Schedules[]>(() => {
    const { data: schedules } = schedulesForMe;

    if (!schedules) return [];
    if (displayedOshis === null) return schedules;

    return schedules.filter((schedule) =>
      displayedOshis.some((displayedOshi) => displayedOshi === schedule.oshi_id),
    );
  }, [displayedOshis, schedulesForMe]);

  const schedulesForOthersData = useMemo<Schedules[]>(() => {
    const { data: schedules } = schedulesForOthers;

    if (!schedules) return [];
    if (displayedOshis === null) return schedules;

    return schedules.filter((schedule) =>
      displayedOshis.some((displayedOshi) => displayedOshi === schedule.oshi_id),
    );
  }, [displayedOshis, schedulesForOthers]);

  return {
    isLoadingSchedulesForMe: schedulesForMe.isLoading,
    isLoadingSchedulesForOthers: schedulesForOthers.isLoading,
    schedulesForMeData,
    schedulesForOthersData,
    calendarTypeIndex,
    displayedOshis,
    setCalendarTypeIndex,
    onPressDate,
    onPressNextButton,
    onPressPrevButton,
    onPressCurrentDate,
    updateDisplayedOshis,
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
