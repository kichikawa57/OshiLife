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
