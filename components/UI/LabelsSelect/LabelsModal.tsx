import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Input,
  Modal,
  Select,
  SelectItem,
  Text,
} from "@ui-kitten/components";
import { Label } from "@/types/Task";
import useTaskList from "@/hooks/useTaskList";
import { Colors } from "@/constants/Colors";
import ColorCircle from "../ColorCircle";
import useColorScheme from "@/hooks/useColorScheme";

interface ModalProps {
  visible: boolean;
  onInvisible: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  label?: Label;
}

const LabelModal: FC<ModalProps> = ({
  visible: modalVisible,
  label,
  onInvisible,
}): React.ReactElement => {
  console.log({ label });
  const { scheme } = useColorScheme();

  const [title, setTitle] = useState(label?.title || "");
  const [color, setColor] = useState(label?.color || "");
  const { saveLabel } = useTaskList();
  const handleHideModal = () => {
    setTitle("");
    setColor("");
    onInvisible();
  };
  const handleConfirm = () => {
    if (!title) {
      return;
    }
    if (!color) {
      return;
    }
    saveLabel({
      id: label?.id || undefined,
      title: title,
      color: color,
    });

    handleHideModal();
  };

  return (
    <Modal
      visible={modalVisible}
      backdropStyle={styles.backdrop}
      onBackdropPress={handleHideModal}
    >
      <Card disabled={true}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text category="h5">{label ? "Edit label" : "Add label"}</Text>
          {/* {label && (
            <TouchableOpacity
              onPress={() => {
                console.log("pressed");
              }}
              activeOpacity={0.2}
              hitSlop={15}
            >
              <AntDesign
                name="delete"
                size={30}
                color={scheme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>
          )} */}
        </View>
        <View style={styles.itemContainer}>
          <Input
            placeholder="Label title"
            value={title}
            onChangeText={(txt) => setTitle(txt)}
          />
          <Select
            placeholder="Select color"
            value={
              color
                ? Colors.labelColors.find(
                    (labelColor) => color === labelColor.color
                  )?.name
                : undefined
            }
            onSelect={(index) => {
              //@ts-ignore
              setColor(Colors.labelColors[index.row].color);
            }}
          >
            {Colors.labelColors.map((labelColor) => {
              return (
                <SelectItem
                  selected={color === labelColor.color}
                  key={labelColor.name}
                  title={labelColor.name}
                  accessoryLeft={<ColorCircle color={labelColor.color} />}
                />
              );
            })}
          </Select>
        </View>
        <View style={styles.buttonsContainer}>
          <Button status="basic" onPress={handleHideModal}>
            DISMISS
          </Button>
          <Button disabled={!title || !color} onPress={handleConfirm}>
            OK
          </Button>
        </View>
      </Card>
    </Modal>
  );
};
export default LabelModal;
const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  itemContainer: {
    paddingVertical: 30,
    gap: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
});
