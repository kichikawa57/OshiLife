import { Alert } from "react-native";
import { useEffect } from "react";

import { DEFAULT_MESSAGE, getOshis } from "../../../api";
import { useQuery } from "../../../query";
import { useUserStore } from "../../../store/user";
import { convertOrigenalToModelForOshi } from "../../../model/oshis";

export const useSelectArtistListContent = () => {
  const userId = useUserStore((store) => store.userId);

  const { data, isLoading, isError } = useQuery(["getOshis"], async () => {
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

  return {
    isLoading,
    oshis: data || [],
  };
};
