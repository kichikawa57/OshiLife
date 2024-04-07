import { Alert } from "react-native";
import { useEffect } from "react";

import { useQuery } from "../../query";
import { getProfile } from "../../api/profile";
import { useUserStore } from "../../store/user";
import { DEFAULT_MESSAGE } from "../../api";
import { getMinutes } from "../../shared/utils";
import { convertOrigenalToModelForProfile } from "../../model/profiles";

export const useProfile = () => {
  const userId = useUserStore((store) => store.userId);

  const { isLoading, data, isError } = useQuery(
    ["getProfile"],
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
      staleTime: getMinutes(5),
    },
  );

  useEffect(() => {
    if (!isError) return;

    Alert.alert(DEFAULT_MESSAGE);
  }, [isError]);

  return {
    data,
    isLoading,
  };
};
