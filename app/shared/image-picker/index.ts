import { Alert, Linking } from "react-native";

interface ImagePickerError extends Error {
  code?: string;
}

export const onErrorImagePicker = (error: unknown) => {
  const e = error as ImagePickerError;

  const openSettings = () => {
    Linking.openSettings();
  };

  if (e instanceof Error && e.code === "E_NO_LIBRARY_PERMISSION") {
    Alert.alert(
      "許可が必要です",
      "写真へのアクセスを許可してください。",
      [
        { text: "キャンセル", style: "cancel" },
        { text: "設定を開く", onPress: openSettings },
      ],
      { cancelable: false },
    );
  } else if (e instanceof Error && e.code === "E_PICKER_CANCELLED") {
    return;
  } else {
    Alert.alert("画像のアップロードに失敗しました");
  }
};
