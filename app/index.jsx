import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import welcome from "./../assets/images/welcome.png";
import logo from "./../assets/images/logo.png";
import Button from "../components/Button";

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Dog Food App</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={welcome} style={styles.image} />
      </View>
      <View style={styles.subTitleContainer}>
        <Text style={styles.subTitleText}>Trusted by many happy dogs 🐕</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          label="Continue with Email"
          handlePress={() => router.push("/sign-in")}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  titleContainer: {
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  imageContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  subTitleContainer: {
    marginBottom: 20,
  },
  subTitleText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
  },
});
