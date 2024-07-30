import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Tabs, router } from "expo-router";

import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { auth } from './../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const TabIcon = ({ icon, name, color, focused }) => {
  return <View style={styles.container}>{icon}</View>;
};

const TabsLayout = () => {

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (!user) {
  //       // Handle user not sign-in
  //       router.replace('/sign-in'); 
  //     }
  //   });
  //   return unsubscribe;
  // }, [])

  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.container}>
                <FontAwesome name="home" size={24} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: "Cart",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.container}>
                <FontAwesome5 name="shopping-cart" size={24} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="educational"
          options={{
            title: "Educational",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.container}>
                <MaterialCommunityIcons name="book-education" size={24} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.container}>
                <FontAwesome name="user" size={24} color={color} />
              </View>
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
