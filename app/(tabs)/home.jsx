import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchProducts, signOutApi } from "../../libs/api";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from "react-native-picker-select";

// Icons
import { FontAwesome6 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

// Config values
import { filter, sort } from "../../config/app.config";

// Redux Slice
import { addItem } from "../../store/features/cartSlice";
import { Link, router } from "expo-router";

const Home = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  console.log("cart ", cart);

  const handleSignOut = () => {
    signOutApi();
  };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);

  // Handle Filter Value
  const handleFilterValueChange = (value) => {
    setSelectedFilter(value);
  };

  // Handle Sort Value
  const handleSortValueChange = (value) => {
    setSelectedSort(value);
  };

  // Handle Clear Search Filter Sort
  const handleReset = () => {
    setSearchText("");
    setSelectedFilter(null);
    setSelectedSort(null);
  };

  // Fetch products
  useEffect(() => {
    const initFn = async () => {
      const { data, status } = await fetchProducts({
        search: searchText,
        category: selectedFilter,
        sort: selectedSort,
      });
      if (status) {
        setProducts(data);
      }
      setLoading(false);
    };
    initFn();
  }, [searchText, selectedFilter, selectedSort]);

  // Handle Add Item To Cart
  const handleAddItemToCart = (item) => {
    dispatch(addItem(item));
  };

  // Loading Content
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Products Loading...</Text>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  console.log({
    searchText,
    selectedFilter,
    selectedSort,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listHeaderContainer}>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            style={styles.input}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search..."
          />
          <TouchableOpacity onPress={handleReset}>
            <FontAwesome5 name="eraser" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={handleFilterValueChange}
              items={filter}
              value={selectedFilter}
              placeholder={{ label: "Filter by:", value: null }}
            />
          </View>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={handleSortValueChange}
              items={sort}
              value={selectedSort}
              placeholder={{ label: "Sort by:", value: null }}
            />
          </View>
        </View>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View>
              <Image
                source={{ uri: item.image }}
                style={styles.itemImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.descriptionView}>
              <Link href={`/pages/${item.id}`}>
                <Text style={styles.itemName}>{item.name}</Text>
              </Link>
            </View>
            <View style={styles.descriptionView}>
              <View style={styles.ratingContainer}>
                <Entypo
                  name="star"
                  size={36}
                  style={{ fontWeight: "bold" }}
                  color="black"
                />
                <Text style={{ fontSize: 36 }}>{item.rating.toFixed(1)}</Text>
              </View>
              <Text style={{ fontSize: 36, color: "gray" }}>LKR {item.price}</Text>
              <TouchableOpacity onPress={() => handleAddItemToCart(item)}>
                <FontAwesome6
                  name="cart-plus"
                  size={36}
                  style={{ fontWeight: "bold" }}
                  color="green"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListHeaderComponent={() => (
          <Text style={styles.listHeader}>Items Count : {products.length}</Text>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
  },
  listHeader: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  itemContainer: {
    marginBottom: 50,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  itemImage: {
    width: "100%",
    height: 500,
  },
  itemName: {
    fontSize: 36,
    fontWeight: "bold",
  },

  descriptionView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: "row",
  },

  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: "90%",
  },
  listHeaderContainer: {},
  pickerContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    width: "50%",
  },
});
