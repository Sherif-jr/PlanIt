import React, { memo, useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import SwipeableItem, {
  OpenDirection,
  SwipeableItemImperativeRef,
  useSwipeableItemParams,
} from "react-native-swipeable-item";
import TaskListCard from "../TaskListCard";
import { TaskList } from "@/types/Task";
import useTaskList from "@/hooks/useTaskList";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "@ui-kitten/components";

const SwipableTaskCard = ({ taskList }: { taskList: TaskList }) => {
  const { deleteTaskList, updateTaskList } = useTaskList();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const swipeableRef = useRef<SwipeableItemImperativeRef>(null);
  const firstRenderRef = useRef(true);
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    swipeableRef.current?.open("left" as OpenDirection);
  }, [confirmDelete]);
  return (
    <SwipeableItem
      ref={swipeableRef}
      key={taskList.id}
      item={taskList}
      renderUnderlayLeft={() => (
        <UnderlayLeft
          pinned={taskList.pinned}
          onPin={() =>
            updateTaskList({ ...taskList, pinned: !taskList.pinned })
          }
          onDelete={() => setConfirmDelete(!confirmDelete)}
          showDeleteConfirmation={confirmDelete}
          onDeleteConfirmation={(shouldDelete) => {
            if (shouldDelete) {
              deleteTaskList(taskList.id);
            } else {
              setConfirmDelete(false);
            }
          }}
        />
      )}
      snapPointsLeft={!confirmDelete ? [50] : [150]}
      overSwipe={0}
    >
      <TaskListCard taskList={taskList} />
    </SwipeableItem>
  );
};

export default SwipableTaskCard;

const UnderlayLeft = ({
  onDelete,
  onPin,
  pinned,
  showDeleteConfirmation,
  onDeleteConfirmation,
}: {
  onDelete: () => void;
  onPin: () => void;
  pinned: boolean;
  showDeleteConfirmation?: boolean;
  onDeleteConfirmation?: (shouldDelete: boolean) => void;
}) => {
  const { close } = useSwipeableItemParams<TaskList>();

  return (
    <View style={[styles.underlayLeft]}>
      {showDeleteConfirmation ? (
        <View style={[styles.underlayLeftButton]}>
          <View
            style={{
              width: 150,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white" }}>Are you sure?</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 5,
                marginTop: 10,
              }}
            >
              <Button
                status="basic"
                size="small"
                style={{
                  elevation: 3,
                }}
                onPress={() => {
                  onDeleteConfirmation?.(false);
                }}
              >
                No
              </Button>
              <Button
                status="danger"
                size="small"
                style={{
                  elevation: 3,
                }}
                onPress={() => {
                  onDeleteConfirmation?.(true);
                }}
              >
                Yes
              </Button>
            </View>
          </View>
        </View>
      ) : (
        <>
          <TouchableOpacity
            style={[styles.underlayLeftButton]}
            onPress={() => onDelete?.()}
          >
            <View
              style={{
                width: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign name="delete" size={24} color="white" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.underlayLeftButton,
              {
                backgroundColor: "#3366ff",
              },
            ]}
            onPress={() => onPin?.()}
          >
            <View
              style={{
                width: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {pinned ? (
                <AntDesign name="pushpin" size={24} color="white" />
              ) : (
                <AntDesign name="pushpino" size={24} color="white" />
              )}
            </View>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 32,
  },
  underlayLeft: {
    flex: 1,
    backgroundColor: "tomato",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    borderRadius: 15,
    overflow: "hidden",
  },
  underlayLeftButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    width: 70,
  },
});
