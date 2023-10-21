import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";

import { DEFAULT_MESSAGE, getOshis, getUser } from "../../../../api";
import { UseNavigationOfRoot, UseRouteOfRoot } from "../../../types";
import { useUserStore } from "../../../../store/user";
import { profileId } from "../../../../model/profiles";
import { useQuery } from "../../../../query";
import { convertOrigenalToModelForOshi } from "../../../../model/oshis";

export const useCheckLoginUser = () => {
  const setUserId = useUserStore((store) => store.setUserId);
  const navigation = useNavigation<UseNavigationOfRoot>();
  const [isFetchedOshisOnce, setIsFetchedOshisOnce] = useState(false);
  const route = useRoute<UseRouteOfRoot>();

  const { isLoading: isLoadingInit } = useQuery(
    "init",
    async () => {
      if (route.name !== "app") return;

      const { data } = await getUser();

      if (data.user === null) throw new Error(DEFAULT_MESSAGE);

      setUserId(profileId(data.user.id));

      return data.user;
    },
    {
      onError: () => {
        navigation.reset({ index: 0, routes: [{ name: "login" }] });
      },
    },
  );

  const { isLoading: isLoadingOshi } = useQuery(
    "getOshis",
    async () => {
      if (route.name !== "app") return;
      setIsFetchedOshisOnce(true);

      const { data: userData } = await getUser();

      if (userData.user === null) throw new Error(DEFAULT_MESSAGE);

      const userId = profileId(userData.user.id);

      const { data, error } = await getOshis(userId);

      if (error !== null) throw new Error(DEFAULT_MESSAGE);

      return data.map((oshi) =>
        convertOrigenalToModelForOshi(
          { ...oshi, created_at: "", updated_at: "", user_id: userId },
          oshi.artists,
        ),
      );
    },
    {
      enabled: !isFetchedOshisOnce,
    },
  );

  return {
    isLoading: isLoadingOshi || isLoadingInit,
  };
};
