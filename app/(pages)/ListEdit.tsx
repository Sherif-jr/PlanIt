import {
  View,
  Keyboard,
  TouchableNativeFeedback,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import {
  Button,
  Datepicker,
  Input,
  Text,
  Toggle,
  TopNavigation,
} from "@ui-kitten/components";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableWithoutFeedback } from "react-native";
import TaskElement from "@/components/UI/TaskElement";
import { router, useLocalSearchParams } from "expo-router";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import useTaskList from "@/hooks/useTaskList";
import { Task, TaskList } from "@/types/Task";
import emptyTaskList from "@/constants/EmptyTaskList";
import LabelsSelect from "@/components/UI/LabelsSelect/LabelsSelect";
import useColorScheme from "@/hooks/useColorScheme";
import { getDateInTime } from "@/helpers/utils";
import { useSelector } from "react-redux";
import { StoreState } from "@/store/slices";

const ListEdit = () => {
  const { scheme } = useColorScheme();
  const { id } = useLocalSearchParams();

  const {
    labels,
    getTaskListByID,
    saveTaskList,
    addTaskToTaskList,
    enableNotification,
    disableNotification,
  } = useTaskList();
  const [currentTaskList, setCurrentTaskList] = useState<TaskList | null>(
    getTaskListByID(id as string)
  );
  const [focusedTask, setFocusedTask] = useState(0);
  const notifyTime = useSelector(
    (state: StoreState) => state.config.notifyTime
  );

  const handleSaveTaskList = (
    taskList: Omit<TaskList, "id"> & { id?: string }
  ) => {
    const latestTaskList = saveTaskList(taskList);
    setCurrentTaskList(latestTaskList);
  };

  return (
    <SafeAreaView
      style={[
        styles.flexGrow,
        { backgroundColor: scheme === "light" ? "white" : "black" },
      ]}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.flexGrow}>
            <TopNavigation
              style={[
                styles.topNavigation,
                { backgroundColor: scheme === "light" ? "white" : "black" },
              ]}
              title={""}
              accessoryLeft={() => (
                // back button
                <TouchableNativeFeedback
                  onPress={() => {
                    router.back();
                  }}
                  hitSlop={15}
                  background={TouchableNativeFeedback.Ripple("#ccc", false)}
                >
                  <AntDesign
                    name="arrowleft"
                    size={24}
                    color={scheme === "dark" ? "white" : "black"}
                  />
                </TouchableNativeFeedback>
              )}
              accessoryRight={() => (
                <View style={styles.accessoryRight}>
                  <View style={styles.notificationContainer}>
                    <Text style={styles.notificationText}>Notify me</Text>
                    <Toggle
                      disabled={
                        Boolean(!currentTaskList) ||
                        !Boolean(currentTaskList?.date) ||
                        getDateInTime(
                          currentTaskList?.date!,
                          notifyTime
                        ).getTime() < new Date().getTime()
                      }
                      onChange={async (checked) => {
                        if (currentTaskList) {
                          if (checked) {
                            const newTaskList = await enableNotification(
                              currentTaskList.id
                            );
                            setCurrentTaskList(newTaskList || currentTaskList);
                          } else {
                            const newTaskList = await disableNotification(
                              currentTaskList.id
                            );
                            setCurrentTaskList(newTaskList || currentTaskList);
                          }
                        }
                      }}
                      checked={currentTaskList?.notification}
                    />
                  </View>
                  <Button
                    status={currentTaskList?.pinned ? "basic" : "primary"}
                    size="small"
                    onPress={() => {
                      handleSaveTaskList({
                        ...currentTaskList,
                        pinned: !currentTaskList?.pinned,
                      });
                    }}
                    accessoryRight={
                      currentTaskList?.pinned ? (
                        <AntDesign name="pushpin" size={14} color="black" />
                      ) : (
                        <AntDesign name="pushpino" size={14} color="white" />
                      )
                    }
                  >
                    {currentTaskList?.pinned ? "Pinned" : "Pin"}
                  </Button>
                </View>
              )}
            />

            <View style={styles.padding}>
              <Input
                style={[
                  styles.input,
                  { backgroundColor: scheme === "light" ? "white" : "black" },
                ]}
                placeholder="Task list title..."
                autoFocus
                value={currentTaskList?.title}
                onChangeText={(txt) => {
                  if (currentTaskList) {
                    handleSaveTaskList({
                      ...currentTaskList,
                      title: txt,
                    });
                  } else {
                    handleSaveTaskList({
                      ...emptyTaskList,
                      title: txt,
                    });
                  }
                }}
              />
            </View>

            <View style={styles.flex}>
              <DraggableFlatList
                data={currentTaskList?.tasks || []}
                renderItem={({
                  item,
                  drag,
                  getIndex,
                }: RenderItemParams<Task>) => (
                  <ScaleDecorator>
                    <TaskElement
                      task={item}
                      focused={focusedTask === getIndex()}
                      onChangeTitle={(id, txt) => {
                        const taskList = saveTaskList({
                          ...currentTaskList,
                          tasks: currentTaskList.tasks.map((task) => {
                            if (task.id === id) {
                              return {
                                ...task,
                                title: txt,
                              };
                            }
                            return task;
                          }),
                        });

                        setCurrentTaskList(taskList);
                      }}
                      onToggle={(id, checked) => {
                        const taskList = saveTaskList({
                          ...currentTaskList,
                          tasks: currentTaskList.tasks.map((task) => {
                            if (task.id === id) {
                              return {
                                ...task,
                                done: checked,
                              };
                            }
                            return task;
                          }),
                        });
                        setCurrentTaskList(taskList);
                      }}
                      onNewLine={() => {
                        const index = getIndex();
                        if (index === currentTaskList.tasks.length - 1) {
                          const taskList = addTaskToTaskList(
                            {
                              title: "task title",
                              done: false,
                            },
                            currentTaskList.id
                          );
                          setCurrentTaskList(taskList);
                          setFocusedTask(index + 1);
                        } else {
                          setFocusedTask(index + 1);
                        }
                      }}
                      onRemove={(id) => {
                        const index = getIndex();
                        const taskList = saveTaskList({
                          ...currentTaskList,
                          tasks: currentTaskList.tasks.filter(
                            (task) => task.id !== id
                          ),
                        });
                        setCurrentTaskList(taskList);
                        if (index > 0) {
                          setFocusedTask(index - 1);
                        } else {
                          setFocusedTask(0);
                        }
                      }}
                      drag={drag}
                    />
                  </ScaleDecorator>
                )}
                keyExtractor={(item) => item.id}
                onDragEnd={({ data }) => {
                  if (currentTaskList) {
                    handleSaveTaskList({
                      ...currentTaskList,
                      tasks: data,
                    });
                  } else {
                    handleSaveTaskList({
                      ...emptyTaskList,
                      tasks: data,
                    });
                  }
                }}
                ListFooterComponent={
                  <View style={styles.footer}>
                    <Button
                      onPress={() => {
                        const taskList = addTaskToTaskList(
                          {
                            title: "task title",
                            done: false,
                          },
                          currentTaskList?.id
                        );
                        setCurrentTaskList(taskList);
                      }}
                      appearance="outline"
                      status="basic"
                      accessoryLeft={
                        <AntDesign name="plus" size={20} color="gray" />
                      }
                    >
                      Add Tasks
                    </Button>
                  </View>
                }
                ListHeaderComponent={
                  <View style={styles.padding}>
                    <Text category="h6">Tasks</Text>
                    <Text appearance="hint">Add tasks to this list</Text>
                    <Text appearance="hint" style={{ fontSize: 10 }}>
                      *Long press on the handle to reorder.
                    </Text>
                    <Text appearance="hint" style={{ fontSize: 10 }}>
                      *'Enter' will create a new task, 'Backspace' on an empty
                      task will delete it.
                    </Text>
                  </View>
                }
              />
            </View>
            <Datepicker
              date={currentTaskList?.date && new Date(currentTaskList?.date)}
              min={new Date()}
              onSelect={(nextDate) => {
                handleSaveTaskList({
                  ...currentTaskList,
                  date: nextDate.toISOString(),
                });
              }}
            />
            <View style={styles.labelSelect}>
              <LabelsSelect
                labels={labels}
                disabled={!Boolean(currentTaskList)}
                onSelect={(labelID) => {
                  handleSaveTaskList({
                    ...currentTaskList,
                    labelID,
                  });
                }}
                selectedID={currentTaskList?.labelID}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default ListEdit;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  topNavigation: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  accessoryRight: {
    flexDirection: "row",
    gap: 10,
  },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  notificationText: {
    fontWeight: "900",
  },
  padding: {
    padding: 20,
  },
  input: {
    backgroundColor: "white",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  labelSelect: {
    flexDirection: "row",
    borderTopColor: "gray",
    borderTopWidth: 1,
    padding: 10,
  },
});
