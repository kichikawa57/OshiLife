import { useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigation, useRoute } from "@react-navigation/native";

import { DEFAULT_MESSAGE, getUser } from "../../../../api";
import { UseNavigationOfRoot, UseRouteOfRoot } from "../../../types";
import { useUserStore } from "../../../../store/user";
import { profileId } from "../../../../model/profiles";

export const useCheckLoginUser = () => {
  const setUserId = useUserStore((store) => store.setUserId);
  const navigation = useNavigation<UseNavigationOfRoot>();
  const route = useRoute<UseRouteOfRoot>();

  const getUserMutation = useMutation(
    async () => {
      const { data } = await getUser();

      if (data.user === null) throw new Error(DEFAULT_MESSAGE);

      return data.user;
    },
    {
      onSuccess: (user) => {
        const { id } = user;
        setUserId(profileId(id));
      },
      onError: () => {
        navigation.reset({ index: 0, routes: [{ name: "login" }] });
      },
    },
  );

  useEffect(() => {
    if (route.name !== "app") return;

    getUserMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading: getUserMutation.isLoading,
  };
};
