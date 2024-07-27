import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import Constants from "expo-constants";
import { TaskList } from "@/types/Task";
import { getDateInTime } from "./utils";
const TWO_WEEKS = 60 * 60 * 24 * 14;

const projectId =
  Constants?.expoConfig?.extra?.eas?.projectId ??
  Constants?.easConfig?.projectId;

interface ScheduleNotificationParams {
  identifier: string;
  title: string;
  subtitle?: string;
  body: string;
  trigger?: Notifications.NotificationRequestInput["trigger"];
}
export const schedulePushNotification = async ({
  identifier,
  title,
  subtitle,
  body,
  trigger,
}: ScheduleNotificationParams) => {
  await Notifications.scheduleNotificationAsync({
    identifier: identifier,
    content: {
      title: title || "A reminder for you!",
      subtitle,
      body,
    },
    trigger: trigger ?? null,
  });
};
export const reScheduleAllNotifications = async (
  notifyTime: string,
  taskLists: TaskList[]
) => {
  //shouldn't be needed as the id is the same
  // await Notifications.cancelAllScheduledNotificationsAsync();
  const promises = taskLists.map((taskList) => {
    if (taskList.date) {
      schedulePushNotification({
        identifier: taskList.id,
        title: taskList.title || "A reminder for you!",
        body: "Get ready for today tasks",
        trigger: {
          date: getDateInTime(taskList.date, notifyTime),
        },
      });
    }
  });
  await Promise.all(promises);
};
export const cancelScheduledNotification = async (identifier: string) => {
  await Notifications.cancelScheduledNotificationAsync(identifier);
};
export const registerForPushNotificationsAsync = async () => {
  let token: string = "";

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "PlanIt Reminder",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FFAABBCC",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: projectId,
      })
    ).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
};
