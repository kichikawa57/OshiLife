import uuid from "react-native-uuid";
import dayjs from "dayjs";

import { OshiId } from "../../model/oshis";
import { ProfileId } from "../../model/profiles";
import { ScheduleResult, ScheduleId } from "../../model/schedules";
import { supabase } from "../init";
import { ArtistId } from "../../model/artists";

type GetSchedulesForMe = { userId: ProfileId; startAt: string; endAt: string; oshiIds?: OshiId[] };
type GetConnectedSchedule = { userId: ProfileId; connectedScheduleId: ScheduleId };
type GetSchedulesForOthers = {
  userId: ProfileId;
  startAt: string;
  endAt: string;
  artistIds: ArtistId[];
};
type CreateSchedule = {
  userId: ProfileId;
  title: string;
  artistId: ArtistId;
  memo: string | null;
  startAt: string;
  isPublic: boolean;
  endAt: string;
  oshiId: OshiId;
  connectedScheduleId: ScheduleId | null;
};
type UpdateSchedule = {
  scheduleId: ScheduleId;
  title: string;
  memo: string | null;
  isPublic: boolean;
  startAt: string;
  endAt: string;
  connectedScheduleId: ScheduleId | null;
};
type UpdateAllConnectedSchedules = {
  connectedScheduleId: ScheduleId;
  title: string;
  memo: string | null;
  isPublic: boolean;
  startAt: string;
  endAt: string;
};
type DeleteConnectedSchedule = { userId: ProfileId; connectedScheduleId: ScheduleId };
type DeleteAllSchedulesRelatedToOshi = { userId: ProfileId; oshiId: OshiId };

export const getSchedulesForMe = async (param: GetSchedulesForMe) => {
  const { userId, startAt, endAt, oshiIds } = param;

  let query = supabase
    .from("schedules")
    .select(
      "id, memo, oshi_id, artist_id, start_at, end_at, title, connected_schedule_id, created_at, deleted_at, is_public, oshis!inner (color), artists!inner (name)",
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .gte("end_at", startAt)
    .lte("start_at", endAt)
    .is("deleted_at", null);

  if (oshiIds) {
    query = query.in("oshi_id", oshiIds);
  }

  const data = await query;

  return data;
};

export const getConnectedSchedule = async (param: GetConnectedSchedule) => {
  const { userId, connectedScheduleId } = param;

  const data = await supabase
    .from("schedules")
    .select("id")
    .eq("user_id", userId)
    .eq("connected_schedule_id", connectedScheduleId)
    .is("deleted_at", null)
    .single();

  return data;
};

export const getSchedulesForOthers = async (param: GetSchedulesForOthers) => {
  const { userId, startAt, endAt, artistIds } = param;

  const data = await supabase
    .from("schedules")
    .select(
      "id, memo, oshi_id, artist_id, start_at, end_at, title, connected_schedule_id, created_at, deleted_at, is_public, oshis!inner (color), artists!inner (name)",
    )
    .neq("user_id", userId)
    .gte("end_at", startAt)
    .lte("start_at", endAt)
    .order("created_at", { ascending: false })
    .in("artist_id", artistIds)
    .is("connected_schedule_id", null)
    .is("is_public", true)
    .is("deleted_at", null);

  return data;
};

export const updateSchedule = async (param: UpdateSchedule) => {
  const data = await supabase
    .from("schedules")
    .update({
      title: param.title,
      start_at: param.startAt,
      end_at: param.endAt,
      is_public: param.isPublic,
      memo: param.memo,
      connected_schedule_id: param.connectedScheduleId,
    })
    .eq("id", param.scheduleId);

  return data;
};

export const updateAllConnectedSchedules = async (param: UpdateAllConnectedSchedules) => {
  const data = await supabase
    .from("schedules")
    .update({
      title: param.title,
      start_at: param.startAt,
      end_at: param.endAt,
      is_public: param.isPublic,
      memo: param.memo,
      connected_schedule_id: param.connectedScheduleId,
    })
    .eq("connected_schedule_id", param.connectedScheduleId);

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
    artist_id: param.artistId,
    connected_schedule_id: param.connectedScheduleId,
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

export const deleteAllSchedulesRelatedToOshi = async (params: DeleteAllSchedulesRelatedToOshi) => {
  const deleted_at = dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  const data = await supabase
    .from("schedules")
    .update({
      deleted_at,
    })
    .eq("user_id", params.userId)
    .eq("oshi_id", params.oshiId);

  return data;
};

export const deleteConnectedSchedule = async (params: DeleteConnectedSchedule) => {
  const { userId, connectedScheduleId } = params;
  const deleted_at = dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZ");

  const data = await supabase
    .from("schedules")
    .update({
      deleted_at,
    })
    .eq("user_id", userId)
    .eq("connected_schedule_id", connectedScheduleId);

  return data;
};

export const getSchedulesFromApi = async (id: ProfileId) => {
  const response = await fetch(
    `http://127.0.0.1:5001/supporting-my-fave-app/us-central1/getSchedules?user_id=${id}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch schedules");
  }
  return response.json() as Promise<ScheduleResult[]>;
};
