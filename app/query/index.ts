import { useQuery as query, useQueryClient as queryClient, UseQueryOptions } from "react-query";

export type QueryKeyName = "getOshis" | "getArtists" | "getProfile";

export const useQuery = <Data = unknown, Error = unknown>(
  key: QueryKeyName,
  fn: () => Promise<Data>,
  options?: Omit<UseQueryOptions<Data, Error, Data, QueryKeyName>, "queryKey" | "queryFn">,
) => {
  return query<Data, Error, Data, QueryKeyName>(key, fn, options);
};

export const useQueryClient = () => {
  const client = queryClient();

  return {
    removeQueries: (key: QueryKeyName) => client.removeQueries(key),
    invalidateQueries: (key: QueryKeyName) => client.invalidateQueries(key),
    setQueryData: <T>(key: QueryKeyName, data: T) => client.setQueryData(key, data),
  };
};
