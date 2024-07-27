import { View, StatusBar, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import useColorScheme from "@/hooks/useColorScheme";
import { Text } from "@ui-kitten/components";
import SettingsMenu from "./SettingsMenu";

const Header = () => {
  const { scheme, setScheme } = useColorScheme();
  const [settingsVisible, setSettingsVisible] = useState(false);
  const logo =
    scheme === "light"
      ? require("../../assets/images/logo-light.png")
      : require("../../assets/images/logo-dark.png");

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={scheme === "light" ? "white" : "black"} />
      <View
        style={[
          styles.container,
          {
            backgroundColor:
              scheme === "light"
                ? Colors.light.background
                : Colors.dark.background,
          },
        ]}
      >
        <View style={styles.header}>
          <View style={styles.logo}>
            <Image style={styles.logoImage} source={logo} />
            <Text style={styles.logoText}>PlanIt</Text>
          </View>
          <View style={styles.controls}>
            {/* <TouchableOpacity style={styles.search} activeOpacity={0.5}>
              <AntDesign
                name="search1"
                size={24}
                color={scheme === "light" ? "black" : "white"}
              />
            </TouchableOpacity> */}
            <SettingsMenu />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  logoImage: {
    width: 40,
    height: 40,
    objectFit: "contain",
  },
  logoText: {
    fontWeight: 900,
    fontSize: 30,
    lineHeight: 40,
  },
  controls: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  search: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Header;
