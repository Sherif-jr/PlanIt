import { View, TouchableOpacity } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { CheckBox, Input } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Task } from "@/types/Task";
import useColorScheme from "@/hooks/useColorScheme";

interface TaskElementProps {
  task: Task;
  onToggle: (id: string, checked: boolean) => void;
  onChangeTitle: (id: string, title: string) => void;
  onRemove: (id: string) => void;
  drag: () => void;
  focused?: boolean;
  onNewLine?: () => void;
}
const TaskElement: FC<TaskElementProps> = ({
  task,
  onToggle,
  onRemove,
  onChangeTitle,
  drag,
  focused,
  onNewLine,
}) => {
  const [shouldRemove, setShouldRemove] = useState(false);
  const { scheme } = useColorScheme();
  const inputRef = React.useRef(null);
  useEffect(() => {
    //focus on the textInput when the task is focused
    if (focused) {
      inputRef.current?.focus();
    }
  }, [focused]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: scheme === "dark" ? "black" : "white",
      }}
    >
      <TouchableOpacity onLongPress={drag} hitSlop={10}>
        <MaterialCommunityIcons
          name="drag"
          size={30}
          color={scheme === "dark" ? "white" : "black"}
        />
      </TouchableOpacity>

      <CheckBox
        checked={task.done}
        onChange={(checked) => {
          onToggle?.(task?.id, checked);
        }}
      />
      <Input
        ref={inputRef}
        placeholder="Enter the task title"
        multiline
        value={task.title}
        style={{
          backgroundColor: scheme === "dark" ? "black" : "white",
          flexGrow: 1,
        }}
        onChangeText={(text) => {
          if (text.endsWith("\n")) {
            return;
          }
          onChangeTitle?.(task?.id, text);
        }}
        onKeyPress={(e) => {
          if (e.nativeEvent.key === "Backspace" && task.title === "") {
            setShouldRemove(true);
          }
          if (
            e.nativeEvent.key === "Backspace" &&
            task.title === "" &&
            shouldRemove
          ) {
            onRemove?.(task?.id);
          }
          if (e.nativeEvent.key === "Enter") {
            onNewLine?.();
          }
        }}
      />
      <TouchableOpacity
        onPress={() => {
          onRemove?.(task?.id);
        }}
      >
        <MaterialCommunityIcons
          name="close"
          size={24}
          color={scheme === "dark" ? "white" : "black"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TaskElement;
