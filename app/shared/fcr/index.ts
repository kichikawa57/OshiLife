import messaging from "@react-native-firebase/messaging";

import { ProfileId } from "../../model/profiles";
import { getProfile, updateProfile } from "../../api";

export const checkFcrToken = async (profileId: ProfileId) => {
  const authorizationStatus = await messaging().requestPermission();

  if (!authorizationStatus) return;

  if (__DEV__) {
    await messaging().setAPNSToken("test");
  }

  const fcr_token = await messaging().getToken();

  const { data } = await getProfile(profileId);

  if (data === null) return;

  if (data.fcr_token === null || data.fcr_token !== fcr_token) {
    updateProfile(profileId, {
      fcr_token,
    });
  }
};

export const refreshFcrToken = async (profileId: ProfileId, token: string) => {
  const authorizationStatus = await messaging().requestPermission();

  if (!authorizationStatus) return;

  if (__DEV__) {
    await messaging().setAPNSToken("test");
  }

  const { data } = await getProfile(profileId);

  if (data === null) return;

  if (data.fcr_token === null || data.fcr_token !== token) {
    updateProfile(profileId, {
      fcr_token: token,
    });
  }
};
