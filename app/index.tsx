import React, { StrictMode } from "react";
import { LogBox } from "react-native";
import type { FC } from "react";

import { Router } from "./router";

LogBox.ignoreLogs(["エラーが発生しました"]);

export const App: FC = () => {
  return (
    <StrictMode>
      <Router />
    </StrictMode>
  );
};
