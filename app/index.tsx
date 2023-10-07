import React, { StrictMode } from "react";
import type { FC } from "react";

import { Router } from "./router";

export const App: FC = () => {
  return (
    <StrictMode>
      <Router />
    </StrictMode>
  );
};
