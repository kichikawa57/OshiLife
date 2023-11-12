import React, { FC, ReactNode } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";

type Props = {
  children: ReactNode;
  isKeyboardAvoidingView?: boolean;
  isEnabledKeyboardAvoiding?: boolean;
};

export const KeyboardWrapper: FC<Props> = ({
  children,
  isEnabledKeyboardAvoiding,
  isKeyboardAvoidingView,
}) => {
  return (
    <>
      {isKeyboardAvoidingView ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : "height"}
          style={{ flex: 1 }}
          enabled={isEnabledKeyboardAvoiding}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
      )}
    </>
  );
};
