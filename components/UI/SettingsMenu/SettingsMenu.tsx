import { reScheduleAllNotifications } from "@/helpers/handleLocalNotification";
import { convertTimeStringToDate, getDateInTime } from "@/helpers/utils";
import useColorScheme from "@/hooks/useColorScheme";
import { StoreState } from "@/store/slices";
import { setNotifyTime } from "@/store/slices/config";
import { AntDesign } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { MenuItem, OverflowMenu, Text } from "@ui-kitten/components";
import { useState } from "react";
import { ToastAndroid, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

function SettingsMenu() {
  const { scheme, setScheme } = useColorScheme();
  const [settingsVisible, setSettingsVisible] = useState(false);
  const notifyTime = useSelector(
    (state: StoreState) => state.config.notifyTime
  );

  const taskLists = useSelector((state: StoreState) => state.tasks.taskLists);
  const toBeNotifiedTaskLists = taskLists.filter((taskList) => {
    const notificationTime = taskList.date
      ? getDateInTime(taskList.date, notifyTime)
      : undefined;
    if (notificationTime && taskList.notification) {
      return true;
    }
    return false;
  });
  const dispatch = useDispatch();

  return (
    <OverflowMenu
      anchor={() => (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setSettingsVisible(true)}
        >
          <AntDesign
            name="setting"
            size={24}
            color={scheme === "light" ? "black" : "white"}
          />
        </TouchableOpacity>
      )}
      visible={settingsVisible}
      onBackdropPress={() => setSettingsVisible(false)}
    >
      <MenuItem
        title={() => {
          return (
            <Text
              style={{
                textAlign: "center",
              }}
            >
              {scheme === "dark" ? "Light Theme" : "Dark Theme"}
              {"\n"}
              <Text
                style={{
                  fontSize: 10,
                  opacity: 0.5,
                }}
              >
                Long Press for system theme
              </Text>
            </Text>
          );
        }}
        onPress={() => {
          if (scheme === "dark") {
            setScheme("light");
            ToastAndroid.show("Switched to light theme", 200);
          } else {
            setScheme("dark");
            ToastAndroid.show("Switched to dark theme", 200);
          }
        }}
        onLongPress={() => {
          setScheme("system");
          ToastAndroid.show("Switched to system theme", 200);
        }}
      />
      <MenuItem
        title={() => {
          return (
            <Text
              style={{
                textAlign: "center",
                width: "100%",
              }}
            >
              Notification Time {"\n"}
              <Text>
                {convertTimeStringToDate(notifyTime).toLocaleTimeString()}
              </Text>
            </Text>
          );
        }}
        onPress={() => {
          DateTimePickerAndroid.open({
            mode: "time",
            value: convertTimeStringToDate(notifyTime),
            onChange: async (_, date) => {
              if (date) {
                const timeString = date.toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                });

                dispatch(setNotifyTime(timeString));
                setSettingsVisible(false);
                await reScheduleAllNotifications(
                  timeString,
                  toBeNotifiedTaskLists
                );
                ToastAndroid.show("Notification time updated", 200);
              }
            },
          });
        }}
      />
    </OverflowMenu>
  );
}

export default SettingsMenu;
