import { View, ScrollView, StyleSheet } from "react-native";
import React, { FC, useState } from "react";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Label } from "@/types/Task";
import { Button, Text } from "@ui-kitten/components";
import LabelComponent from "./LabelComponent";
import LabelModal from "./LabelsModal";

interface LabelsSelectProps {
  labels: Label[];
  disabled?: boolean;
  selectedID?: string;
  onSelect?: (id: string) => void;
}

const LabelsSelect: FC<LabelsSelectProps> = ({
  labels,
  disabled,
  onSelect,
  selectedID,
}) => {
  const [editModal, setEditModal] = useState<{
    visible: boolean;
    label: Label;
  }>({
    visible: false,
    label: null,
  });
  return (
    <>
      <ScrollView horizontal>
        <View style={styles.container}>
          {labels.map((label) => (
            <LabelComponent
              selected={selectedID === label.id}
              key={label.id}
              label={label}
              onPress={() => {
                if (selectedID === label.id) {
                  setEditModal({
                    visible: true,
                    label: label,
                  });
                } else {
                  onSelect?.(label.id);
                }
              }}
              disabled={disabled}
            />
          ))}
          <Button
            disabled={disabled}
            status="basic"
            onPress={() => setEditModal({ visible: true, label: null })}
          >
            Add Label
          </Button>
        </View>
      </ScrollView>
      <LabelModal
        key={editModal.label?.id}
        visible={editModal.visible}
        label={editModal.label}
        onInvisible={() => setEditModal({ visible: false, label: null })}
      />
    </>
  );
};

export default LabelsSelect;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    padding: 10,
    marginEnd: 10,
  },
});
