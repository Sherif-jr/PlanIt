import { useState, useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "@/helpers/handleLocalNotification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocalStorageKeys } from "@/constants/Enums";
import { useDispatch } from "react-redux";
import { setNotifyTime } from "@/store/slices/config";
import { TaskList } from "@/types/Task";

interface ILocalNotificationHook {
  expoPushToken: string | undefined;
  notification: Notifications.Notification;
}
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
export const useLocalNotification = (): ILocalNotificationHook => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(
    {} as Notifications.Notification
  );
  const notificationListener = useRef<Notifications.Subscription | undefined>();
  const responseListener = useRef<Notifications.Subscription | undefined>();
  const dispatch = useDispatch();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token || "");
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log({ notification });

        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
        setNotification(response.notification);
      });

    return () => {
      if (notificationListener.current?.remove) {
        notificationListener.current.remove();
      }
      if (responseListener.current?.remove) {
        responseListener.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    const fetchNotificationTime = async () => {
      const config = await AsyncStorage.getItem(LocalStorageKeys.CONFIG);
      const localNotificationTime = config
        ? JSON.parse(config)?.notifyTime
        : undefined;
      if (localNotificationTime) {
        dispatch(setNotifyTime(localNotificationTime));
      }
    };
    fetchNotificationTime();
  }, []);

  return { expoPushToken, notification };
};
