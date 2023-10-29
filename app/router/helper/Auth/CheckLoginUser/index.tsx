import React, { FC, ReactNode } from "react";

import { Loading } from "../../../../pages/Loading";

import { useCheckLoginUser } from "./hooks";

type Props = {
  children: ReactNode;
};

export const CheckLoginUser: FC<Props> = ({ children }) => {
  const { isLoading, isError } = useCheckLoginUser();

  return <>{isLoading || isError ? <Loading /> : children}</>;
};
