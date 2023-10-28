import { useMutation } from "react-query";
import { Alert } from "react-native";

import { signout } from "../../../api/users/signout";
import { RoutingPropsOfRoot } from "../../../router/types";
import { DEFAULT_MESSAGE } from "../../../api";

export const useSetting = (rootRoute: RoutingPropsOfRoot<"app">) => {
  const signoutMutation = useMutation(
    async () => {
      const { error } = await signout();

      if (error !== null) throw error;

      rootRoute.navigation.reset({
        index: 0,
        routes: [
          {
            name: "login",
          },
        ],
      });
    },
    {
      onError: () => {
        Alert.alert(DEFAULT_MESSAGE);
      },
    },
  );

  return {
    signoutMutation,
  };
};
