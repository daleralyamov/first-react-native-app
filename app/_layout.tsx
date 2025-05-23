import { AppLockProvider } from "@/utils/appLockContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function RootLayout() {
  return (
    <AppLockProvider>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="lock-page" options={{ animation: "none" }} />
        <Stack.Screen name="(app)" options={{ animation: "none" }} />
      </Stack>
    </AppLockProvider>
  );
}
