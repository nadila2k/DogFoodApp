import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Slot, Stack, router } from "expo-router";

import { auth } from "./../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

import { Provider } from "react-redux";
import { store } from "./../store/store";

const RootLayout = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, redirect to home
        router.replace("/home");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="pages/[productId]" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
};

export default RootLayout;
