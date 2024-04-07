import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import dayjs from "dayjs";
import messaging from "@react-native-firebase/messaging";

import { DEFAULT_MESSAGE, getOshis, getUser } from "../../../../api";
import { UseNavigationOfRoot, UseRouteOfRoot } from "../../../types";
import { useUserStore } from "../../../../store/user";
import { profileId } from "../../../../model/profiles";
import { useQuery } from "../../../../query";
import { convertOrigenalToModelForOshi } from "../../../../model/oshis";
import { checkFcrToken } from "../../../../shared/fcr";
import { yyyymmdd } from "../../../../shared/constants/date/dayJs";

export const useCheckLoginUser = () => {
  const { setUserId } = useUserStore();
  const navigation = useNavigation<UseNavigationOfRoot>();
  const [isFetchedOshisOnce, setIsFetchedOshisOnce] = useState(false);
  const route = useRoute<UseRouteOfRoot>();

  const {
    data,
    isLoading: isLoadingInit,
    isError,
    isSuccess,
  } = useQuery(["init"], async () => {
    if (route.name !== "app") return;

    const { data } = await getUser();

    if (data.user === null) throw new Error(DEFAULT_MESSAGE);

    setUserId(profileId(data.user.id));

    return profileId(data.user.id);
  });

  useEffect(() => {
    if (!isSuccess) return;

    if (!data) return;
    checkFcrToken(data);
  }, [data, isSuccess]);

  useEffect(() => {
    if (!isError) return;

    navigation.reset({ index: 0, routes: [{ name: "login" }] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  const { isLoading: isLoadingOshi } = useQuery(
    ["getOshis"],
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

  useEffect(() => {
    if (!isLoadingInit && !isLoadingInit) {
      SplashScreen.hide();
    }
  }, [isLoadingOshi, isLoadingInit, navigation]);

  useEffect(() => {
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      if (remoteMessage.data?.type === "noticeScheduleForTheDayEveryDay") {
        setTimeout(() => {
          navigation.navigate("appScheduleDate", {
            date: String(remoteMessage.data?.date) || dayjs().format(yyyymmdd),
            calendarType: "me",
          });
        }, 1000);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading: isLoadingOshi || isLoadingInit,
    isError,
  };
};
