import React, { FC, ReactNode } from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";

type Props = {
  children: ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const Wrapper: FC<Props> = ({ children }) => {
  return (
    <NavigationContainer
      linking={{
        prefixes: ["oshilife://"],
        config: {
          initialRouteName: "app",
          screens: {
            app: "app",
            setupUser: "setupUser",
            setupOshi: "setupOshi",
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </NavigationContainer>
  );
};
