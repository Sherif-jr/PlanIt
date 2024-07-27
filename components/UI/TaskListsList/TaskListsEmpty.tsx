import { View, Image } from "react-native";
import React, { FC } from "react";
import { Button, Text } from "@ui-kitten/components";
import { Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
interface TaskListsEmptyProps {
  title: string;
  showAddButton?: boolean;
}
const TaskListsEmpty: FC<TaskListsEmptyProps> = ({ title, showAddButton }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
        gap: 50,
      }}
    >
      <Image
        source={require("../../../assets/images/emptyListImg.png")}
        style={{
          width: "100%",
          objectFit: "cover",
        }}
      />
      <Text category="h5">{title}</Text>
      {showAddButton && (
        <Link href="/(pages)/ListEdit" asChild>
          <Button
            style={{
              elevation: 5,
            }}
            accessoryLeft={<AntDesign name="plus" size={24} color="white" />}
            size="large"
          >
            <Text>New List</Text>
          </Button>
        </Link>
      )}
    </View>
  );
};

export default TaskListsEmpty;
