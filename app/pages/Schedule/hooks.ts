import { useCallback, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import { RoutingPropsOfSchedule } from "../../router/app/Schedule/types";

export const useSchedule = (scheduleRoute: RoutingPropsOfSchedule<"top">) => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isOpenDate, setIsOpenDate] = useState(false);

  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

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

  const onPressDate = () => {
    scheduleRoute.navigation.navigate("date");
  };

  return {
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
