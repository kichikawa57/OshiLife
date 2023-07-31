import React from "react";
import { act, render, renderHook } from "@testing-library/react-native";

import { Icon } from "../../components/Icon";

import { useRouter } from "./hooks";
import { RoutingOfApp } from "./types";

jest.mock("../../components/Icon", () => ({
  Icon: jest.fn(() => <></>),
}));

describe("useRouter", () => {
  describe("tabBarIcon", () => {
    test.each`
      route         | icon             | focused
      ${"schedule"} | ${"calendar"}    | ${false}
      ${"schedule"} | ${"calendar"}    | ${true}
      ${"oshi"}     | ${"star"}        | ${false}
      ${"oshi"}     | ${"star"}        | ${true}
      ${"profile"}  | ${"user-circle"} | ${false}
      ${"profile"}  | ${"user-circle"} | ${true}
    `(
      "should call Icon with the expected props when name in route is $route and focused is $focused",
      async ({
        route,
        icon,
        focused,
      }: {
        route: keyof RoutingOfApp;
        icon: string;
        focused: boolean;
      }) => {
        const { result } = renderHook(() => useRouter());

        let returnValue = null;

        act(() => {
          returnValue = result.current.tabBarIcon(
            { key: "", name: route },
            { focused, color: "", size: 0 },
          );
        });

        render(<>{returnValue}</>);

        expect(Icon).toBeCalledWith(
          {
            name: icon,
            color: focused ? "#000" : "#ccc",
          },
          {},
        );
      },
    );
  });
});
