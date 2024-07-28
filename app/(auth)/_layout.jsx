import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Stack, router } from "expo-router";

import { auth } from './../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const AuthLayout = () => {

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, redirect to home
        router.replace('/home'); // Replace with your actual home screen route
      }
    });
    return unsubscribe;
  }, [])

  return (
    <>
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
