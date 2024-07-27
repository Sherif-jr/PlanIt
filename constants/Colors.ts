/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    // background: '#151718',
    background: "#000",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
  // labelColors: [
  //   "#FFF6E7",
  //   "#E5FFE6",
  //   "#F3E4F6",
  //   "#FFD700",
  //   "#AED6F1",
  //   "#F0B27A",
  //   "#C8E6C9",
  //   "#FAD7A0",
  //   "#D5DBDB",
  //   "#F5B7B1",
  //   "#D7BDE2",
  //   "#F9E79F",
  //   "#FADBD8",
  //   "#D5DBDB",
  //   "#F9E79F",
  //   "#AED6F1",
  //   "#F0B27A",
  //   "#C8E6C9",
  //   "#FAD7A0",
  //   "#F5B7B1",
  //   "#D7BDE2",
  //   "#F5CBA7",
  //   "#D4E6F1",
  //   "#F8C471",
  //   "#D2B4DE",
  //   "#F7DC6F",
  //   "#D1F2EB",
  //   "#F4D03F",
  //   "#D0ECE7",
  //   "#F39C12",
  //   "#D0D3D4",
  //   "#F4A460",
  // ],
  labelColors: [
    { color: "#FADBD8", name: "Pale Rose" },
    { color: "#D5DBDB", name: "Silver Sand" },
    { color: "#F9E79F", name: "Maize" },
    { color: "#AED6F1", name: "Light Blue" },
    { color: "#F0B27A", name: "Moccasin" },
    { color: "#C8E6C9", name: "Pastel Green" },
    { color: "#FAD7A0", name: "Champagne" },
    { color: "#F5B7B1", name: "Light Coral" },
    { color: "#D7BDE2", name: "Lavender Pink" },
    { color: "#F5CBA7", name: "Sandy Brown" },
    { color: "#D4E6F1", name: "Light Steel Blue" },
    { color: "#F8C471", name: "Light Goldenrod" },
    { color: "#D2B4DE", name: "Thistle" },
    { color: "#F7DC6F", name: "Sunflower" },
    { color: "#D1F2EB", name: "Light Cyan" },
    { color: "#F4D03F", name: "Saffron" },
    { color: "#D0ECE7", name: "Powder Blue" },
    { color: "#F39C12", name: "Bright Orange" },
    { color: "#D0D3D4", name: "Gainsboro" },
    { color: "#F4A460", name: "Sandy Brown" },
  ],
};

export interface LabelColor{
  color: string;
  name: string;
} 