import { useQuery as query, useQueryClient as queryClient, UseQueryOptions } from "react-query";
import { User } from "@supabase/supabase-js";

import { Oshis } from "../model/oshis";
import { ArtistsGroups } from "../model/artists";
import { ProfileId, Profiles } from "../model/profiles";
import { Schedules } from "../model/schedules";

export type QueryKeyName =
  | "getOshis"
  | "getArtists"
  | "getProfile"
  | "getConnectedSchedule"
  | "init"
  | [
      (
        | "getScheduleForMe"
        | "getScheduleForOthers"
        | "getScheduleAtDateForMe"
        | "getScheduleAtDateForOthers"
      ),
      string,
    ];

export type ReturnType<K extends QueryKeyName> = K extends string
  ? K extends "getOshis"
    ? Oshis[] | undefined
    : K extends "getArtists"
    ? ArtistsGroups[] | undefined
    : K extends "getProfile"
    ? Profiles | undefined
    : K extends "init"
    ? ProfileId | undefined
    : K extends "getConnectedSchedule"
    ? boolean
    : null
  : K[0] extends "getScheduleForMe" | "getScheduleForOthers"
  ? Schedules[] | undefined
  : K[0] extends "getScheduleAtDateForMe" | "getScheduleAtDateForOthers"
  ? Schedules[] | undefined
  : null;

export const useQuery = <K extends QueryKeyName, Error = unknown>(
  key: K,
  fn: () => Promise<ReturnType<K>>,
  options?: Omit<
    UseQueryOptions<ReturnType<K>, Error, ReturnType<K>, QueryKeyName>,
    "queryKey" | "queryFn"
  >,
) => {
  return query<ReturnType<K>, Error, ReturnType<K>, QueryKeyName>(key, fn, options);
};

export const useQueryClient = () => {
  const client = queryClient();

  return {
    removeQueries: (key: QueryKeyName) => client.removeQueries(key),
    removeAllQueriesForSchedules: () => {
      const queryCache = client.getQueryCache();
      const cacheAll = queryCache.getAll();
      const keys = cacheAll.map((cache) => cache.queryKey as QueryKeyName);

      keys.forEach((key) => {
        if (!Array.isArray(key)) return;

        const name = key[0];
        if (!(name === "getScheduleForMe" || name === "getScheduleForOthers")) return;

        client.removeQueries(key);
      });
    },
    invalidateQueries: (key: QueryKeyName) => client.invalidateQueries(key),
    setQueryData: <K extends QueryKeyName>(key: K, data: ReturnType<K>) =>
      client.setQueryData(key, data),
    getQueryData: <K extends QueryKeyName>(key: K) => client.getQueryData<ReturnType<K>>(key),
    getAllQueryKeys: () => {
      const queryCache = client.getQueryCache();
      const cacheAll = queryCache.getAll();

      return cacheAll.map((cache) => cache.queryKey as QueryKeyName);
    },
  };
};
