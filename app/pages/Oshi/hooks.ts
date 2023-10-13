import { useMutation } from "react-query";
import { Alert } from "react-native";

import { useUserStore } from "../../store/user";
import { getOshis, deleteOshi, DEFAULT_MESSAGE } from "../../api";
import { useQuery, useQueryClient } from "../../query";
import { OshiId, convertOrigenalToModelForOshi } from "../../model/oshis";

export const useOshi = () => {
  const userId = useUserStore((store) => store.userId);

  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery(
    "getOshis",
    async () => {
      const { data, error } = await getOshis(userId);

      if (error !== null) throw error;

      return data.map((oshi) =>
        convertOrigenalToModelForOshi(
          { ...oshi, created_at: "", updated_at: "", user_id: userId },
          oshi.artists,
        ),
      );
    },
    {
      onError: () => {
        Alert.alert(DEFAULT_MESSAGE);
      },
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
    oshis: data || [],
    onPressDeletedOshiButton: deleteOshiMutation.mutate,
  };
};
