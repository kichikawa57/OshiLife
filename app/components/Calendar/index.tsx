import React, { FC } from "react";

import { CalendarPresenter } from "./presenter";
import { useCalendar } from "./hooks/use-calendar";

export const Calendar: FC = () => {
  const { getMonth } = useCalendar();

  getMonth(7);

  return <CalendarPresenter />;
};
