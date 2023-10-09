import { useState } from "react";
import { useMutation } from "react-query";
import { Alert } from "react-native";

import { useUserStore } from "../../store/user";
import { getOshis, deleteOshi, DEFAULT_MESSAGE } from "../../api";
import { useQuery, useQueryClient } from "../../query";
import { OshiId, Oshis, oshiId } from "../../model/oshis";
import { artistId } from "../../model/artists";
import { getMinutes } from "../../shared/utils";

export const useOshi = () => {
  const [oshis, setOshis] = useState<Oshis[]>([]);

  const userId = useUserStore((store) => store.userId);

  const queryClient = useQueryClient();

  const { isLoading, refetch } = useQuery(
    "getOshis",
    async () => {
      const { data } = await getOshis(userId);

      return data;
    },
    {
      onSuccess: (data) => {
        if (data === null) return;

        setOshis(
          data.map<Oshis>((oshi) => {
            return {
              id: oshiId(oshi.id),
              user_id: userId,
              artist_id: artistId(oshi.artist_id),
              artist_name: oshi.artists?.name || "",
              image_url: oshi.image_url,
              memo: oshi.memo,
              color: oshi.color,
              is_edit_color: oshi.is_edit_color,
            };
          }),
        );
      },
      cacheTime: getMinutes(30),
      staleTime: getMinutes(5),
    },
  );

  const deleteOshiMutation = useMutation(
    async (params: { id: OshiId }) => {
      const { error } = await deleteOshi(params.id);

      if (error !== null) throw error;

      return params.id;
    },
    {
      onSuccess: () => {
        queryClient.removeQueries("getOshis");
        refetch();
      },
      onError: () => {
        Alert.alert(DEFAULT_MESSAGE);
      },
    },
  );

  return {
    isLoading,
    isLoadingDeletedOshi: deleteOshiMutation.isLoading,
    oshis,
    onPressDeletedOshiButton: deleteOshiMutation.mutate,
  };
};
