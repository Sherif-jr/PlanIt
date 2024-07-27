import { StoreState } from "@/store/slices";
import { setTheme } from "@/store/slices/config";
import { useColorScheme as useSystemColorScheme } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const useColorScheme = () => {
  const systemColorScheme = useSystemColorScheme();
  const currentTheme = useSelector((state: StoreState) => state.config.theme);
  const dispatch = useDispatch();

  const adjustColorBrightness = (color: string, percent: number): string => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const r = Math.min(255, Math.max(0, (num >> 16) + amt));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
    const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
    return `#${(0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const lightenColor = (color: string, percent: number): string => {
    return adjustColorBrightness(color, percent);
  };

  const darkenColor = (color: string, percent: number): string => {
    return adjustColorBrightness(color, -percent);
  };
  const setScheme = (scheme: "dark" | "light" | "system") => {
    dispatch(setTheme(scheme));
  };
  return {
    scheme: currentTheme === "system" ? systemColorScheme : currentTheme,
    lightenColor,
    darkenColor,
    setScheme,
  };
};

export default useColorScheme;
