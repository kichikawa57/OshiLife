import { Model, Phantom } from "../../helper";
import { ProfileId } from "../../profiles";
import { Database } from "../../../api/schema";
import { OshiId } from "../../oshis";

export type ScheduleId = Phantom<string, "ScheduleId">;

export type Overwrite<T, U extends { [Key in keyof T]?: unknown }> = Omit<T, keyof U> & U;

export type Schedules = Overwrite<
  Database["public"]["Tables"]["schedules"]["Row"],
  { id: ScheduleId; user_id: ProfileId; oshi_id: OshiId }
>;
