import React from "react";
import { render } from "@testing-library/react-native";

import { RoutingPropsOfRoot } from "../../router/types";

import { Login } from "./index";

describe("Login", () => {
  const defaultRootRoute: RoutingPropsOfRoot<"login"> = {
    route: {
      key: "",
      name: "login",
      params: undefined,
    },
    navigation: {
      navigate: jest.fn(),
      reset: jest.fn(),
      goBack: jest.fn(),
    },
  };

  it("should render Login", () => {
    const { getByText } = render(<Login rootRoute={defaultRootRoute} />);

    expect(getByText("Login")).toBeTruthy();
  });
});
