import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import useColorScheme from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocalStorageKeys } from "@/constants/Enums";
import { useDispatch } from "react-redux";
import { setConfig } from "@/store/slices/config";
interface ThemeProvidersProps {
  onThemeLoaded: () => void;
}

const ThemeProviders: FC<PropsWithChildren<ThemeProvidersProps>> = ({
  children,
  onThemeLoaded,
}) => {
  const { scheme } = useColorScheme();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadConfig = async () => {
      const localConfig = await AsyncStorage.getItem(LocalStorageKeys.CONFIG);
      if (localConfig) {
        const parsedConfig = JSON.parse(localConfig);
        dispatch(setConfig(parsedConfig));
      }
      onThemeLoaded?.();
    };
    loadConfig();
  }, []);
  return (
    <ApplicationProvider
      {...eva}
      theme={scheme === "dark" ? eva.dark : eva.light}
    >
      <ThemeProvider value={scheme === "dark" ? DarkTheme : DefaultTheme}>
        {children}
      </ThemeProvider>
    </ApplicationProvider>
  );
};

export default ThemeProviders;
