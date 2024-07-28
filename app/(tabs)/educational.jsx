import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchPosts } from "../../libs/api";
import VideoPlayer from "../../components/VideoPlayer";

const Educational = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts
  useEffect(() => {
    const initFn = async () => {
      const { data, status } = await fetchPosts();
      if (status) {
        setPosts(data);
      }
      setLoading(false);
    };
    initFn();
  }, []);

  // Loading Content
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Posts Loading...</Text>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.title}</Text>
            {item.type === 'article' && (
              <Image
                source={{ uri: item.url }}
                style={styles.itemImage}
                resizeMode="cover"
              />
            )}
            {item.type === 'video' && (
              <VideoPlayer url={item.url} />
            )}
            <Text style={styles.description} >{item.description.substring(0, 100)}...</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Educational;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  itemContainer: {
    marginBottom: 50,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
  description: {
    fontSize: 24,
    fontWeight: "bold",
  },
  itemImage: {
    width: "100%",
    height: 500,
  },
});
