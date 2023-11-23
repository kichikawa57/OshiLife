import { Alert } from "react-native";

import { useQuery } from "../../query";
import { getProfile } from "../../api/profile";
import { useUserStore } from "../../store/user";
import { DEFAULT_MESSAGE } from "../../api";
import { getMinutes } from "../../shared/utils";
import { convertOrigenalToModelForProfile } from "../../model/profiles";

export const useProfile = () => {
  const userId = useUserStore((store) => store.userId);

  const { isLoading, data } = useQuery(
    "getProfile",
    async () => {
      const { data, error } = await getProfile(userId);

      if (error !== null) throw error;

      return convertOrigenalToModelForProfile({
        ...data,
        fcr_token: "",
        updated_at: "",
        deleted_at: "",
        created_at: "",
      });
    },
    {
      onError: () => {
        Alert.alert(DEFAULT_MESSAGE);
      },
      cacheTime: getMinutes(30),
      staleTime: getMinutes(5),
    },
  );

  return {
    data,
    isLoading,
  };
};
