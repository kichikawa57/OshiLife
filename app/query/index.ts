import {
  useQuery as query,
  useQueryClient as queryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import { Oshis } from "../model/oshis";
import { ArtistsGroups } from "../model/artists";
import { ProfileId, Profiles } from "../model/profiles";
import { ScheduleResult, Schedules } from "../model/schedules";

export type QueryKeyName =
  | "getOshis"
  | "getSchedulesInYear"
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

export type ReturnType<K extends QueryKeyName[]> = K[0] extends string
  ? K[0] extends "getOshis"
    ? Oshis[] | undefined
    : K[0] extends "getArtists"
    ? ArtistsGroups[] | undefined
    : K[0] extends "getProfile"
    ? Profiles | undefined
    : K[0] extends "init"
    ? ProfileId | undefined
    : K[0] extends "getConnectedSchedule"
    ? boolean
    : K[0] extends "getSchedulesInYear"
    ? ScheduleResult[] | undefined
    : null
  : K[0][0] extends "getScheduleForMe" | "getScheduleForOthers"
  ? Schedules[] | undefined
  : K[0][0] extends "getScheduleAtDateForMe" | "getScheduleAtDateForOthers"
  ? Schedules[] | undefined
  : null;

export const useQuery = <K extends QueryKeyName[], Error = unknown>(
  key: K,
  fn: () => Promise<ReturnType<K>>,
  options?: Omit<
    UseQueryOptions<ReturnType<K>, Error, ReturnType<K>, QueryKeyName[]>,
    "queryKey" | "queryFn"
  >,
) => {
  return query<ReturnType<K>, Error, ReturnType<K>, QueryKeyName[]>({
    queryKey: key,
    queryFn: fn,
    ...options,
  });
};

export const useQueryClient = () => {
  const client = queryClient();

  return {
    removeQueries: (key: QueryKeyName[]) =>
      client.removeQueries({
        queryKey: key,
      }),
    removeAllQueriesForSchedules: () => {
      const queryCache = client.getQueryCache();
      const cacheAll = queryCache.getAll();
      const keys = cacheAll.map((cache) => cache.queryKey as QueryKeyName[]);

      keys.forEach((key) => {
        if (!Array.isArray(key)) return;

        const name = key[0][0];
        if (!(name === "getScheduleForMe" || name === "getScheduleForOthers")) return;

        client.removeQueries({
          queryKey: key,
        });
      });
    },
    invalidateQueries: (key: QueryKeyName[]) =>
      client.invalidateQueries({
        queryKey: key,
      }),
    setQueryData: <K extends QueryKeyName[]>(key: K, data: (old: ReturnType<K>) => ReturnType<K>) =>
      client.setQueryData<unknown, K, (old: ReturnType<K>) => ReturnType<K>>(key, data),
    getQueryData: <K extends QueryKeyName[]>(key: K) => client.getQueryData<ReturnType<K>>(key),
    getAllQueryKeys: () => {
      const queryCache = client.getQueryCache();
      const cacheAll = queryCache.getAll();

      return cacheAll.map((cache) => cache.queryKey as QueryKeyName);
    },
  };
};
