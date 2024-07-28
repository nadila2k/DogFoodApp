import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './../../firebaseConfig'; // Adjust path based on your project structure
import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore'; // Import Firestore functions
import { db } from './../../firebaseConfig';

const SignIn = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts1 = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(postsData);
        console.log(postsData);
      } catch (error) {
        console.error('Error fetching posts: ', error);
        return [];
      }
    };
    fetchPosts1();
  }, [])

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, 'tinithse@gmail.com', 'hello@helo')
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  }

  const fetchPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(posts);
    } catch (error) {
      console.error('Error fetching posts: ', error);
      return [];
    }
  };

  const updatePost = async () => {
    try {
      const postId = '33'; // Replace with the actual document ID
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, { text: 'Updated text', title: 'Updated title' });
      console.log('Document updated successfully!');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const queryPostData = async () => {
    try {
      const q = query(collection(db, "posts"), where("title", "==", "example"));
      const querySnapshot = await getDocs(q);
      const filteredPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("Filtered posts:", filteredPosts);
    } catch (error) {
      console.error('Error querying posts:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.logoContainer}>
          {/* <Image source={logo} style={styles.logo} /> */}
        </View>
        <TouchableOpacity onPress={handleSignUp}><Text>Sign Up</Text></TouchableOpacity>
        <TouchableOpacity onPress={fetchPosts}><Text>Get posts</Text></TouchableOpacity>
        <TouchableOpacity onPress={updatePost}><Text>Update posts</Text></TouchableOpacity>
        <TouchableOpacity onPress={queryPostData}><Text>Query posts data</Text></TouchableOpacity>

        {posts.map((post) => (
          <View key={post.id} style={styles.post}>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text>{post.text}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  post: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
