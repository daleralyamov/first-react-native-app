import { AppLockContext } from "@/utils/appLockContext";
import Linking, { addEventListener, parse } from "expo-linking";
import * as LocalAuthentication from "expo-local-authentication";
import { Redirect, useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { Button, View } from "react-native";

export default function LockPage() {
  const appLockState = useContext(AppLockContext);
  const router = useRouter();

  const handleStartIdentification = async () => {
    const result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      appLockState.unlock();
      router.replace("/(app)");
    }
  };

  useEffect(() => {
    const handleUrl = (event: Linking.EventType) => {
      const { path, queryParams } = parse(event.url);
      console.log("Opened URL:", event.url);
      console.log("Path:", path);
      console.log("Params:", queryParams);
    };

    const subscription = addEventListener("url", handleUrl);
    return () => subscription.remove();
  }, []);

  if (!appLockState.isLocked) {
    return <Redirect href="/(app)" />;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#15171A"
      }}
    >
      <Button onPress={handleStartIdentification} title="Identify" />
    </View>
  );
}
