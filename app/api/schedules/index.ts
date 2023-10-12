import uuid from "react-native-uuid";
import dayjs from "dayjs";

import { OshiId } from "../../model/oshis";
import { ProfileId } from "../../model/profiles";
import { ScheduleId } from "../../model/schedules";
import { supabase } from "../init";

type GetSchedules = { userId: ProfileId; startAt: string; endAt: string; oshiIds?: OshiId[] };
type CreateSchedule = {
  userId: ProfileId;
  title: string;
  memo: string | null;
  startAt: string;
  isPublic: boolean;
  endAt: string;
  oshiId: OshiId;
};
type UpdateSchedule = {
  scheduleId: ScheduleId;
  title: string;
  memo: string | null;
  isPublic: boolean;
  startAt: string;
  endAt: string;
  oshiId: OshiId;
};

export const getSchedulesForMe = async (param: GetSchedules) => {
  const { userId, startAt, endAt, oshiIds } = param;

  let query = supabase
    .from("schedules")
    .select("id, memo, oshi_id, start_at, end_at, title, created_at, deleted_at")
    .eq("user_id", userId)
    .gte("start_at", startAt)
    .lte("start_at", endAt)
    .is("deleted_at", null);

  if (oshiIds) {
    query = query.in("oshi_id", oshiIds);
  }

  const data = await query;

  return data;
};

export const getSchedulesForOthers = async (param: GetSchedules) => {
  const { userId, startAt, endAt, oshiIds } = param;

  let query = supabase
    .from("schedules")
    .select("id, memo, oshi_id, start_at, end_at, title, created_at, deleted_at")
    .neq("user_id", userId)
    .gte("start_at", startAt)
    .lte("start_at", endAt)
    .is("deleted_at", null);

  if (oshiIds) {
    query = query.in("oshi_id", oshiIds);
  }

  const data = await query;

  return data;
};

export const updateSchedule = async (param: UpdateSchedule) => {
  const data = await supabase
    .from("schedules")
    .update({
      oshi_id: param.oshiId,
      title: param.title,
      start_at: param.startAt,
      end_at: param.endAt,
      is_public: param.isPublic,
      memo: param.memo,
    })
    .eq("id", param.scheduleId);

  return data;
};

export const createSchedule = async (param: CreateSchedule) => {
  const id = String(uuid.v4());

  const data = await supabase.from("schedules").insert({
    id,
    user_id: param.userId,
    oshi_id: param.oshiId,
    title: param.title,
    is_public: param.isPublic,
    start_at: param.startAt,
    end_at: param.endAt,
    memo: param.memo,
  });

  return data;
};

export const deleteSchedule = async (id: ScheduleId) => {
  const deleted_at = dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  const data = await supabase
    .from("schedules")
    .update({
      deleted_at,
    })
    .eq("id", id);

  return data;
};
