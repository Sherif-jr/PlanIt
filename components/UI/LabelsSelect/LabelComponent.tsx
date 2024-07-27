import { View, Text, StyleSheet } from "react-native";
import React, { FC } from "react";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Label } from "@/types/Task";
import useColorScheme from "@/hooks/useColorScheme";

interface LabelComponentProps {
  label: Label;
  onPress?: () => void;
  selected?: boolean;
  disabled?: boolean;
}

const LabelComponent: FC<LabelComponentProps> = ({
  label,
  onPress,
  selected,
  disabled,
}) => {
  const { scheme } = useColorScheme();
  return (
    <TouchableHighlight
      onPress={onPress}
      activeOpacity={0.7}
      underlayColor="gray"
      disabled={disabled}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: label.color,
            borderWidth: selected ? 2 : 0,
            borderColor: selected
              ? scheme === "dark"
                ? "white"
                : "black"
              : "transparent",
          },
        ]}
      >
        <Text
          style={{
            color: scheme === "dark" ? "black" : "white",
            fontWeight: selected ? "bold" : "normal",
          }}
        >
          {label.title}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default LabelComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
});
