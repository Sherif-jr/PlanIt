import { View, StyleSheet } from "react-native";
import React, { FC } from "react";

interface ColorCircleProps {
  color: string;
  size?: number;
}

const ColorCircle: FC<ColorCircleProps> = ({ color, size = 16 }) => {
  const calculatedSizeStyle = { width: size, height: size };
  return (
    <View
      style={[
        styles.colorCircle,
        calculatedSizeStyle,
        { backgroundColor: color },
      ]}
    />
  );
};

export default ColorCircle;

const styles = StyleSheet.create({
  colorCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
});
