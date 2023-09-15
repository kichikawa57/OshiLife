import { ReactNode } from "react";
import { RouteProp } from "@react-navigation/native";

type Route = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type Navigation<T extends Route> = {
  navigate: <K extends keyof T>(page: K, params?: T[K]) => void;
  reset: (props: { index: number; routes: Array<{ name: keyof T }> }) => void;
  goBack: () => void;
};

export type NavigationProps<T extends Route, K extends keyof T> = {
  route: RouteProp<T, K>;
  navigation: Navigation<T>;
};

export type TabBarIconProps<T extends Route, K extends keyof T> = (
  route: RouteProp<T, K>,
  props: { focused: boolean; color: string; size: number },
) => ReactNode;
