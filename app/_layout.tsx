import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import Header from "@/components/UI/Header";
import { Provider } from "react-redux";
import store from "@/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ThemeProviders from "@/providers/ThemeProviders";
import * as TaskManager from "expo-task-manager";
import * as Notification from "expo-notifications";

TaskManager.defineTask("BACKGROUND_NOTIFICATION", () => {
  return null;
});
Notification.registerTaskAsync("BACKGROUND_NOTIFICATION");

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [configLoaded, setConfigLoaded] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded && configLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, configLoaded]);

  // if (!loaded && !configLoaded) {
  //   return null;
  // }

  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <ThemeProviders onThemeLoaded={() => setConfigLoaded(true)}>
          <Stack
            screenOptions={{
              animation: "ios",
            }}
          >
            <Stack.Screen
              name="(pages)/index"
              options={{
                headerShown: true,
                header() {
                  return <Header />;
                },
              }}
            />

            <Stack.Screen
              name="(pages)/ListEdit"
              options={{
                title: "Edit List",
                headerShown: false,
              }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProviders>
      </GestureHandlerRootView>
    </Provider>
  );
}
