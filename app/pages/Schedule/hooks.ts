import { useCallback, useMemo, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Alert, PanResponder } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { RoutingPropsOfSchedule } from "../../router/app/Schedule/types";
import { getSchedulesForMe, getSchedulesForOthers } from "../../api/schedules";
import { useUserStore } from "../../store/user";
import { getCalendarBounds } from "../../shared/utils";
import { Schedules, convertOrigenalToModelForSchedule } from "../../model/schedules";
import { DEFAULT_MESSAGE } from "../../api";
import { useQuery, useQueryClient } from "../../query";
import { CalendarType } from "../../shared/types/components/schedules";
import { OshiId } from "../../model/oshis";
import { yyyymmddhhmmss } from "../../shared/constants/date/dayJs";

export const useSchedule = (scheduleRoute: RoutingPropsOfSchedule<"appScheduleTop">) => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isOpenDate, setIsOpenDate] = useState(false);
  const [calendarTypeIndex, setCalendarTypeIndex] = useState(0);
  const [displayedOshis, setDisplayedOshis] = useState<OshiId[] | null>(null);
  const params = scheduleRoute.route.params;

  const { setQueryData, getQueryData, removeAllQueriesForSchedules } = useQueryClient();

  const userId = useUserStore((props) => props.userId);

  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs(params?.date || undefined));

  const swipeCalendar = useRef(
    PanResponder.create({
      // ユーザーがタッチしたときにレスポンダーになるべきかどうかを決定
      onStartShouldSetPanResponder: () => true,
      // すべての移動イベントをこのレスポンダで処理
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (_, gestureState) => {
        // スワイプ中の処理
        // gestureState.dx はスワイプの水平方向の距離
        if (gestureState.dx > 80) {
          // 右にスワイプした時の処理
          onPressPrevButton();
        } else if (gestureState.dx < -80) {
          // 左にスワイプした時の処理
          onPressNextButton();
        }
      },
    }),
  ).current;

  const today = useMemo(() => {
    return dayjs();
  }, []);

  const schedulesForMe = useQuery(
    ["getScheduleForMe", currentDate.format("YYYY-MM")],
    async () => {
      const { start, end } = getCalendarBounds(currentDate);
      const oshis = getQueryData("getOshis");

      const { data, error } = await getSchedulesForMe({
        userId,
        startAt: start,
        endAt: end,
      });

      if (error !== null) throw error;

      return data.map<Schedules>((schedule) => {
        const oshi = oshis?.find((oshi) => schedule.artist_id === oshi.artist_id) ?? null;

        return convertOrigenalToModelForSchedule(
          {
            ...schedule,
            is_public: false,
            user_id: userId,
            updated_at: "",
            deleted_at: "",
          },
          schedule.artists,
          oshi,
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
    ["getScheduleForOthers", currentDate.format("YYYY-MM")],
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
        const oshi = oshis?.find((oshi) => schedule.artist_id === oshi.artist_id) ?? null;

        return convertOrigenalToModelForSchedule(
          {
            ...schedule,
            is_public: false,
            user_id: userId,
            updated_at: "",
            deleted_at: "",
          },
          schedule.artists,
          oshi,
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

  const switchCalendarType = (index: number) => {
    if (index > 1) return;

    setCalendarTypeIndex(index);
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

      scheduleRoute.navigation.navigate("appScheduleDate", {
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

  const onPressRefresh = () => {
    removeAllQueriesForSchedules();
    schedulesForMe.refetch();
    schedulesForOthers.refetch();
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
      schedulesForMe.refetch();
      schedulesForOthers.refetch();

      return () => null;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return {
    isLoadingSchedulesForMe: schedulesForMe.isLoading,
    isLoadingSchedulesForOthers: schedulesForOthers.isLoading,
    schedulesForMeData,
    schedulesForOthersData,
    calendarTypeIndex,
    displayedOshis,
    startDate,
    endDate,
    swipeCalendar,
    switchCalendarType,
    onPressDate,
    onPressNextButton,
    onPressPrevButton,
    onPressCurrentDate,
    updateDisplayedOshis,
    onPressRefresh,
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
