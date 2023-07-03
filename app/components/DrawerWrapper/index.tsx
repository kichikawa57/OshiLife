import React from "react";
import type { FC, ReactNode } from "react";

import { DrawerWrapperPresenter } from "./presenter";
import { useDrawerWrapper } from "./hooks/useDrawerWrapper";

type Props = {
  body: ReactNode;
};

export const DrawerWrapper: FC<Props> = ({ body }) => {
  const { translate, panResponder } = useDrawerWrapper();

  return <DrawerWrapperPresenter body={body} translate={translate} panResponder={panResponder} />;
};
