import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  fetchUserData,
  getCurrentUserUid,
  updateUserData,
} from "../../libs/api";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Local state for editable fields
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    const initFn = async () => {
      try {
        const uId = getCurrentUserUid();

        if (uId) {
          console.log("uid ", uId);
          const { status, data } = await fetchUserData(uId);
          if (status) {
            setUserData(data);
            setAddress1(data.address1);
            setAddress2(data.address2);
            setNumber(data.number);
          }
        } else {
          console.log("User not authenticated");
        }
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setLoading(false);
      }
    };
    initFn();
  }, []);

  // Function to handle updating user data
  const handleUpdateUserData = async () => {
    setIsLoading(true);
    try {
      const uId = getCurrentUserUid();
      if (uId) {
        const updatedUserData = {
          address1,
          address2,
          number,
        };
        await updateUserData(uId, updatedUserData);
        Alert.alert("Success", "Profile updated successfully!");
      } else {
        console.log("User not authenticated");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }finally {
      setIsLoading(false)
    }
  };

  // Loading Content
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Profile Loading...</Text>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>User Profile</Text>
      </View>
      <View style={styles.profileCard}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          value={userData.username}
          editable={false}
        />
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={userData.email}
          editable={false}
        />
        <Text style={styles.label}>Address Line 1:</Text>
        <TextInput
          style={styles.input}
          value={address1}
          onChangeText={(text) => setAddress1(text)}
        />
        <Text style={styles.label}>Address Line 2:</Text>
        <TextInput
          style={styles.input}
          value={address2}
          onChangeText={(text) => setAddress2(text)}
        />
        <Text style={styles.label}>Number:</Text>
        <TextInput
          style={styles.input}
          value={number}
          onChangeText={(text) => setNumber(text)}
        />
        <Button
          label="Update User"
          handlePress={handleUpdateUserData}
          isLoading={isLoading}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderColor: "red",
    borderWidth: 1,
  },
  heading: {
    alignItems: "left",
    marginBottom: 20,
  },
  headingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  profileCard: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
  },

  value: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  noData: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});
