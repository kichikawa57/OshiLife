import React, { FC } from "react";
import dayjs from "dayjs";

import { StyledText, StyledView } from "./style";

type Props = {
  //
};

export const Calendar: FC<Props> = () => {
  return (
    <StyledView>
      <StyledText>{dayjs().format("YYYY年MM月DD日 HH:mm:ss")}</StyledText>
    </StyledView>
  );
};
