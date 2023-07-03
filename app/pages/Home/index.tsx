import React, { FC } from "react";

import { DrawerWrapper } from "../../components/DrawerWrapper";
import { Calendar } from "../../components/Calendar";

export const Home: FC = () => {
  return <DrawerWrapper body={<Calendar />} />;
};
