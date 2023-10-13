import { Database } from "../../api/schema";
import { artistGroupId, artistId } from "../artists";
import { oshiId } from "../oshis";
import { profileId } from "../profiles";

import { ScheduleForCalendar, ScheduleId, Schedules } from "./types";

export * from "./types";

export const scheduleId = (n: string) => n as ScheduleId;

export const convertScheduleForCalendarToModel: (calendar: ScheduleForCalendar) => Schedules = (
  calendar: ScheduleForCalendar,
) => {
  return {
    id: calendar.id,
    user_id: calendar.user_id,
    oshi_id: calendar.oshi_id,
    artist_id: calendar.artist_id,
    start_at: calendar.start_at,
    end_at: calendar.end_at,
    is_public: calendar.is_public,
    memo: calendar.memo,
    title: calendar.title,
    created_at: calendar.created_at,
    updated_at: calendar.updated_at,
    deleted_at: calendar.deleted_at,
    artists: calendar.artists,
    oshi: calendar.oshi,
    connected_schedule_id: calendar.connected_schedule_id,
  };
};

export const convertOrigenalToModelForSchedule: (
  calendar: Database["public"]["Tables"]["schedules"]["Row"],
  artist: Partial<Database["public"]["Tables"]["artists"]["Row"]> | null,
  oshi: Partial<Database["public"]["Tables"]["oshis"]["Row"]> | null,
) => Schedules = (
  calendar: Database["public"]["Tables"]["schedules"]["Row"],
  artist: Partial<Database["public"]["Tables"]["artists"]["Row"]> | null,
  oshi: Partial<Database["public"]["Tables"]["oshis"]["Row"]> | null,
) => {
  return {
    id: scheduleId(calendar.id),
    user_id: profileId(calendar.user_id),
    oshi_id: oshiId(calendar.oshi_id),
    artist_id: artistId(calendar.artist_id),
    start_at: calendar.start_at,
    end_at: calendar.end_at,
    is_public: calendar.is_public,
    memo: calendar.memo,
    title: calendar.title,
    connected_schedule_id: calendar.connected_schedule_id
      ? scheduleId(calendar.connected_schedule_id)
      : null,
    created_at: calendar.created_at,
    updated_at: calendar.updated_at,
    deleted_at: calendar.deleted_at,
    artists: artist
      ? {
          id: artistId(artist.id || ""),
          name: artist.name || "",
          furigana: artist.furigana || "",
          group_id: artistGroupId(artist.group_id || ""),
          created_at: artist.created_at || "",
          updated_at: artist.updated_at || "",
          deleted_at: artist.deleted_at || "",
        }
      : null,
    oshi: oshi
      ? {
          id: oshiId(oshi.id || ""),
          user_id: profileId(oshi.user_id || ""),
          artist_id: artistId(oshi.artist_id || ""),
          color: oshi.color || "",
          image_url: oshi.image_url || "",
          artists: null,
          memo: oshi.memo || "",
          is_edit_color: oshi.is_edit_color || false,
          created_at: oshi.created_at || "",
          updated_at: oshi.updated_at || "",
          deleted_at: oshi.deleted_at || "",
        }
      : null,
  };
};
