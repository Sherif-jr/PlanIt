import { View, StyleSheet } from "react-native";
import React, { FC } from "react";
import { TaskList } from "@/types/Task";
import { useSelector } from "react-redux";
import { StoreState } from "@/store/slices";
import { Text } from "@ui-kitten/components";
import { TouchableHighlight } from "react-native";
import { router } from "expo-router";
import { getTextColor } from "@/helpers/utils";
import { AntDesign } from "@expo/vector-icons";
import useColorScheme from "@/hooks/useColorScheme";

interface TaskListCardProps {
  taskList: TaskList;
}

const TaskListCard: FC<TaskListCardProps> = ({ taskList }) => {
  const { scheme } = useColorScheme();

  const label = useSelector((state: StoreState) =>
    state.tasks.labels.find(
      (existingLabel) => existingLabel.id === taskList.labelID
    )
  );

  const titleColor = taskList.title
    ? scheme === "dark"
      ? "white"
      : "black"
    : "gray";

  return (
    <TouchableHighlight
      underlayColor="gray"
      activeOpacity={0.7}
      onPress={() =>
        router.navigate({
          pathname: "(pages)/ListEdit",
          params: {
            id: taskList.id,
          },
        })
      }
      style={styles.touchableHighlight}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: label?.color
              ? label.color
              : scheme === "light"
              ? "white"
              : "black",
            borderColor: scheme === "dark" ? "white" : "black",
          },
        ]}
      >
        <Text
          category="h4"
          style={{
            color: label?.color ? getTextColor(label.color) : titleColor,
            marginBottom: 5,
          }}
        >
          {taskList.title || "No title"}
        </Text>
        <View style={styles.row}>
          {label?.title && (
            <View
              style={[
                styles.labelContainer,
                {
                  backgroundColor: label.color
                    ? getTextColor(label.color)
                    : scheme === "dark"
                    ? "white"
                    : "black",
                },
              ]}
            >
              <Text
                style={{
                  color: label.color,
                }}
              >
                {label.title}{" "}
              </Text>
            </View>
          )}
          {/* date */}
          {taskList.date && (
            <View style={styles.dateContainer}>
              <AntDesign
                name="calendar"
                size={16}
                color={
                  label?.color
                    ? getTextColor(label.color)
                    : scheme === "dark"
                    ? "white"
                    : "black"
                }
              />
              <Text
                style={{
                  color: label?.color
                    ? getTextColor(label.color)
                    : scheme === "dark"
                    ? "white"
                    : "black",
                }}
              >
                {taskList.date
                  ? new Date(taskList.date)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, "-")
                  : ""}
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 12,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              Last Modified:{" "}
            </Text>
            {new Date(taskList.updatedAt).toLocaleString("en-GB", {
              hour12: true,
              timeStyle: "short",
              dateStyle: "short",
            })}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};
export default TaskListCard;
const styles = StyleSheet.create({
  touchableHighlight: {
    borderRadius: 15,
    overflow: "hidden",
  },
  container: {
    borderRadius: 15,
    borderWidth: 1,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    gap: 15,
  },
  labelContainer: {
    borderRadius: 10,
    padding: 7,
  },
  dateContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});
