import { StyleSheet, View } from "react-native";
import React, { useMemo, useState } from "react";
import { Tab, TabView } from "@ui-kitten/components";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import useTaskList from "@/hooks/useTaskList";
import FAB from "@/components/UI/FAB";
import TaskListsList from "@/components/UI/TaskListsList";
import { useLocalNotification } from "@/hooks/useLocalNotification";
import useColorScheme from "@/hooks/useColorScheme";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  useLocalNotification();

  const [activePage, setActivePage] = useState(0);
  const { taskLists } = useTaskList();
  const { scheme } = useColorScheme();

  const lists = useMemo(() => {
    const tLists = [...taskLists];
    const sortedTaskList = tLists.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    const pinnedTaskLists = sortedTaskList.filter(
      (taskList) => taskList.pinned
    );
    return {
      pinnedTaskLists,
      sortedTaskList,
    };
  }, [taskLists]);

  return (
    <>
      <StatusBar backgroundColor={scheme === "dark" ? "black" : "white"} />
      <View style={homeStyles.container}>
        <View style={homeStyles.contentContainer}>
          <TabView
            selectedIndex={activePage}
            onSelect={(index) => setActivePage(index)}
            style={homeStyles.tabViewContainer}
            swipeEnabled={false}
          >
            <Tab title="All Lists" style={homeStyles.tabContainer}>
              <View style={homeStyles.taskListsListContainer}>
                <TaskListsList
                  taskLists={lists.sortedTaskList}
                  emptyText="Create your first to-do list..."
                  emptyAddButton={true}
                />
              </View>
            </Tab>
            <Tab title="Pinned">
              <View style={homeStyles.taskListsListContainer}>
                <TaskListsList
                  taskLists={lists.pinnedTaskLists}
                  emptyText="You have no pinned task lists."
                  emptyAddButton={lists.sortedTaskList.length === 0}
                />
              </View>
            </Tab>
          </TabView>
        </View>
        <FAB
          icon={
            <AntDesign
              name="plus"
              size={24}
              color={scheme === "dark" ? "black" : "white"}
            />
          }
          visible={taskLists.length > 0}
          onPress={() => {
            router.navigate({
              pathname: "/(pages)/ListEdit",
              params: {
                id: "1",
              },
            });
          }}
          color={scheme === "dark" ? "white" : "black"}
        />
      </View>
    </>
  );
};

export default Home;

const homeStyles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  tabViewContainer: {
    width: "90%",
    borderRadius: 10,
    flex: 1,
  },
  tabContainer: {
    padding: 15,
  },
  taskListsListContainer: {
    flexGrow: 1,
    paddingVertical: 30,
    gap: 20,
  },
});
