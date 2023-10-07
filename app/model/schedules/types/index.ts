import { Model, Phantom } from "../../helper";
import { ProfileId } from "../../profiles";

export type ScheduleId = Phantom<string, "ScheduleId">;

export type Schedules = Model<
  ScheduleId,
  {
    user_id: ProfileId;
    oshi_id: string;
    title: string;
    memo: string;
    start_at: string;
    end_at: string;
    is_public: boolean;
  }
>;
