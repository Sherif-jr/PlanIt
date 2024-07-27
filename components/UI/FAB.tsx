import React, { FC } from "react";
import { View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

interface FABProps {
  onPress?: () => void;
  icon?: React.ReactElement;
  color?: string;
  size?: "small" | "medium" | "large";
  placement?: "left" | "right";
  visible?: boolean;
}

const FAB: FC<FABProps> = ({
  onPress,
  icon,
  color = "black",
  size = "medium",
  placement = "right",
  visible = true,
}) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={{ zIndex: 9999, display: visible ? "flex" : "none" }}
      activeOpacity={0.7}
    >
      <View
        style={{
          backgroundColor: color,
          borderRadius: 50,
          width: size === "small" ? 40 : size === "medium" ? 56 : 72,
          height: size === "small" ? 40 : size === "medium" ? 56 : 72,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 16,
          right: placement === "right" ? 16 : undefined,
          left: placement === "left" ? 16 : undefined,
          elevation: 5,
        }}
      >
        {icon}
      </View>
    </TouchableHighlight>
  );
};
export default FAB;
