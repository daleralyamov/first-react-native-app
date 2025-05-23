import { AppLockContext } from "@/utils/appLockContext";
import { Redirect, Stack } from "expo-router";
import { useContext } from "react";

export default function AppLayout() {
  const appLockState = useContext(AppLockContext);

  if (appLockState.isLocked) {
    return <Redirect href="/lock-page" />;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
}
