import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { useEffect } from "react";

import { useUserStore } from "../../store/user";
import { getOshis, deleteOshi, DEFAULT_MESSAGE } from "../../api";
import { useQuery, useQueryClient } from "../../query";
import { OshiId, convertOrigenalToModelForOshi } from "../../model/oshis";
import { deleteAllSchedulesRelatedToOshi } from "../../api/schedules";

export const useOshi = () => {
  const userId = useUserStore((store) => store.userId);

  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery(["getOshis"], async () => {
    const { data, error } = await getOshis(userId);

    if (error !== null) throw error;

    return data.map((oshi) =>
      convertOrigenalToModelForOshi(
        { ...oshi, created_at: "", updated_at: "", user_id: userId },
        oshi.artists,
      ),
    );
  });

  useEffect(() => {
    if (!isError) return;

    Alert.alert(DEFAULT_MESSAGE);
  }, [isError]);

  const deleteOshiMutation = useMutation({
    mutationFn: async (params: { id: OshiId }) => {
      const { error } = await deleteOshi(params.id);

      if (error !== null) throw error;

      const deleteAllSchedulesRelatedToOshiResponse = await deleteAllSchedulesRelatedToOshi({
        userId,
        oshiId: params.id,
      });

      if (deleteAllSchedulesRelatedToOshiResponse.error !== null)
        throw deleteAllSchedulesRelatedToOshiResponse.error;

      return params.id;
    },
    onSuccess: () => {
      queryClient.removeQueries(["getOshis"]);
      queryClient.removeAllQueriesForSchedules();
      refetch();
    },
    onError: () => {
      Alert.alert(DEFAULT_MESSAGE);
    },
  });

  return {
    isLoading,
    isLoadingDeletedOshi: deleteOshiMutation.isPending,
    oshis: data || [],
    onPressDeletedOshiButton: deleteOshiMutation.mutate,
  };
};
