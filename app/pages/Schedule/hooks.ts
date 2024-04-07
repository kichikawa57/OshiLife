import { useCallback, useEffect, useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { RoutingPropsOfSchedule } from "../../router/app/Schedule/types";
import { getSchedulesFromApi } from "../../api/schedules";
import { useUserStore } from "../../store/user";
import { ScheduleResult } from "../../model/schedules";
import { DEFAULT_MESSAGE } from "../../api";
import { useQuery, useQueryClient } from "../../query";
import { OshiId } from "../../model/oshis";
import { yyyymmddhhmmss } from "../../shared/constants/date/dayJs";

export const useSchedule = (scheduleRoute: RoutingPropsOfSchedule<"appScheduleTop">) => {
  const [isFirstRender, setIsFirstRender] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isOpenDate, setIsOpenDate] = useState(false);
  const [displayedOshis, setDisplayedOshis] = useState<OshiId[] | null>(null);
  const params = scheduleRoute.route.params;

  const { getQueryData } = useQueryClient();

  const userId = useUserStore((props) => props.userId);

  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs(params?.date || undefined));

  const today = useMemo(() => {
    return dayjs();
  }, []);

  const schedulesInYear = useQuery(
    ["getSchedulesInYear"],
    async () => {
      const data = await getSchedulesFromApi(userId);
      return data;
    },
    {
      staleTime: 0,
    },
  );

  useEffect(() => {
    if (!schedulesInYear.isError) return;

    Alert.alert(DEFAULT_MESSAGE);
  }, [schedulesInYear.isError]);

  const onPressCompleteForDate = useCallback(async (date: Dayjs) => {
    setIsOpenDate(false);
    setCurrentDate(date);
  }, []);

  const onPressCancelForDate = () => {
    setIsOpenDate(false);
  };

  const onPressDate = useCallback(
    (calendarDate: string) => {
      scheduleRoute.navigation.navigate("appScheduleDate", {
        date: calendarDate,
        calendarType: "me",
      });
    },
    [scheduleRoute.navigation],
  );

  const updateDisplayedOshis = (oshiId: OshiId) => {
    setDisplayedOshis((props) => {
      const oshis = getQueryData(["getOshis"]);
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

  const schedules = useMemo<ScheduleResult[]>(() => {
    const { data: schedules } = schedulesInYear;

    if (!schedules) return [];
    if (displayedOshis === null) return schedules;

    return schedules;
  }, [displayedOshis, schedulesInYear]);

  const startDate = useMemo(() => {
    const thisMonth = today.format("YYYYMM");
    const currentMonth = currentDate.format("YYYYMM");

    if (thisMonth === currentMonth) {
      return currentDate.startOf("day").format(yyyymmddhhmmss);
    }

    return currentDate.startOf("month").startOf("day").format(yyyymmddhhmmss);
  }, [currentDate, today]);

  const endDate = useMemo(() => {
    const thisMonth = today.format("YYYYMM");
    const currentMonth = currentDate.format("YYYYMM");

    if (thisMonth === currentMonth) {
      return currentDate.endOf("day").format(yyyymmddhhmmss);
    }

    return currentDate.startOf("month").endOf("day").format(yyyymmddhhmmss);
  }, [currentDate, today]);

  useFocusEffect(
    useCallback(() => {
      schedulesInYear.refetch();

      return () => null;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return {
    isLoading: schedulesInYear.isLoading,
    schedules,
    displayedOshis,
    startDate,
    endDate,
    currentDate,
    isFirstRender,
    onPressDate,
    updateDisplayedOshis,
    setIsFirstRender,
    filterContent: {
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
