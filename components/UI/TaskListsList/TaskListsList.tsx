import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { TaskList } from "@/types/Task";
// import TaskListCard from "../TaskListCard";
import TaskListsEmpty from "./TaskListsEmpty";
import SwipableTaskCard from "../SwipableTaskCard/SwipableTaskCard";
import Animated, { LinearTransition } from "react-native-reanimated";
import { Text } from "@ui-kitten/components";

const { height } = Dimensions.get("window");
interface TaskListsListProps {
  taskLists: TaskList[];
  emptyText: string;
  emptyAddButton?: boolean;
}

const TaskListsList: FC<TaskListsListProps> = ({
  taskLists,
  emptyText,
  emptyAddButton,
}) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {taskLists?.length > 0 && (
        <>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 10,
              color: "#666",
            }}
          >
            Swipe the cards for more actions
          </Text>
          {taskLists.map((taskList) => {
            return (
              <Animated.View key={taskList.id} layout={LinearTransition}>
                <SwipableTaskCard taskList={taskList} />
              </Animated.View>
            );
          })}
        </>
      )}
      {taskLists?.length === 0 && (
        <TaskListsEmpty title={emptyText} showAddButton={emptyAddButton} />
      )}
    </ScrollView>
  );
};

export default TaskListsList;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  contentContainer: {
    flexGrow: 1,
    // paddingHorizontal: 10,
    gap: 20,
  },
});
