import { Dayjs } from "dayjs";

import { Phantom } from "../../helper";
import { ProfileId } from "../../profiles";
import { Database } from "../../../api/schema";
import { OshiId, Oshis } from "../../oshis";
import { Overwrite } from "../../../shared/types";
import { ArtistId, Artists } from "../../artists";

export type ScheduleId = Phantom<string, "ScheduleId">;

export type Schedules = Overwrite<
  Database["public"]["Tables"]["schedules"]["Row"],
  {
    id: ScheduleId;
    user_id: ProfileId;
    oshi_id: OshiId;
    artist_id: ArtistId;
    artists: Artists | null;
    oshi: Oshis | null;
    connected_schedule_id: ScheduleId | null;
  }
>;

export type ScheduleForCalendar = Schedules & {
  isTransparent: boolean;
  startWeekIndex: number;
  endWeekIndex: number;
};

type ScheduleResultData = {
  date: Dayjs;
  isToday: boolean;
  isOtherMonth: boolean;
  holiday: string | null;
  isSaturday: boolean;
  isSunday: boolean;
  day: string;
  dateFormat: string;
  schedules: ScheduleForCalendar[];
};

export type ScheduleResult = {
  data: ScheduleResultData[][];
  year: number;
  month: number;
};
