import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { fetchProductById } from "../../libs/api";
import { SafeAreaView } from "react-native-safe-area-context";

import { FontAwesome5 } from '@expo/vector-icons';

const ProductDetails = () => {
  const { productId } = useLocalSearchParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initFn = async () => {
      try {
        if (productId) {
          const response = await fetchProductById(productId);
          if (response.status) {
            setProduct(response.data);
          } else {
            console.error("Error fetching product:", response.message);
            Alert.alert("Error fetching product");
          }
        }
      } catch (error) {
        Alert.alert("Error fetching product");
      } finally {
        setLoading(false);
      }
    };
    initFn();
  }, [productId]);

  // Loading Content
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Product Loading...</Text>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headingView}>
          <Text style={styles.headingText}>{product.name}</Text>
        </View>
        <View style={styles.imageView}>
          <Image
            source={{ uri: product.image }}
            style={styles.itemImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.descriptionView}>
          <Text>{product.description}</Text>
          <Text>{product.description}</Text>
        </View>
        <View style={styles.pointView}>
          <Text style={styles.textBold}>Category : {product.category} </Text>
          <Text style={styles.textBold}>Brand : {product.brand} </Text>
          <Text style={styles.textBold}>Price : {product.price} </Text>
          <Text style={styles.textBold}>Unit : {product.unit} </Text>
        </View>
        <View style={styles.ratingView}>
          <Text style={styles.textBold}>Ratings</Text>
          <View style={{flexDirection: "row"}}>
            <FontAwesome5 name="star" size={24} color="black" />
            <FontAwesome5 name="star" size={24} color="black" />
            <FontAwesome5 name="star" size={24} color="black" />
            <FontAwesome5 name="star" size={24} color="black" />
            <FontAwesome5 name="star" size={24} color="black" />
          </View>
          <Text style={styles.textBold}>{product.rating}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
  },
  headingView: {
    alignItems: "left",
    padding: 0,
  },
  imageView: {},
  headingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  itemImage: {
    width: "100%",
    height: 500,
  },
  ratingView: {
    
  },

  textBold: {
    fontWeight: "bold",
  },
});
