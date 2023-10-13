import { Alert } from "react-native";

import { DEFAULT_MESSAGE, getOshis } from "../../../api";
import { useQuery } from "../../../query";
import { useUserStore } from "../../../store/user";
import { convertOrigenalToModelForOshi } from "../../../model/oshis";

export const useSelectArtistListContent = () => {
  const userId = useUserStore((store) => store.userId);

  const { data, isLoading } = useQuery(
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

  return {
    isLoading,
    oshis: data || [],
  };
};
