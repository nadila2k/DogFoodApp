import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

// Icons
import { Feather } from "@expo/vector-icons";
import { addItem, removeItem } from "../../store/features/cartSlice";
import EmptyList from "../../components/EmptyList";

const Cart = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { items, totalItems, totalPrice } = cart;

  // Handle Plus Icon
  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  // Handle Minus Icon
  const handleRemoveItem = (item) => {
    dispatch(removeItem(item.id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.listContainer}
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartRow}>
            <Image
              source={{ uri: item.image }}
              style={styles.itemImage}
              resizeMode="contain"
            />
            <View style={styles.itemDescription}>
              <Text style={styles.itemName}>{item.name}</Text>
              <View style={styles.cartControl}>
                <TouchableOpacity onPress={() => handleAddItem(item)}>
                  <Feather name="plus-square" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.itemQuantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => handleRemoveItem(item)}>
                  <Feather name="minus-square" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <Text style={styles.itemPrice}>
                {item.currency} {item.price}
              </Text>
            </View>
            <View style={styles.itemTotalPrice}>
              <Text style={styles.itemPrice}>
                {item.currency} {item.price * item.quantity}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyList
            title="No Items in cart"
            subtitle="Add items from the shop..."
          />
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: </Text>
        <Text style={styles.totalPrice}>LKR {totalPrice}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  listContainer: {
    marginTop: 10,
  },
  cartRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemImage: {
    width: 80,
    height: 80,
  },
  itemDescription: {
    flex: 1,
    marginHorizontal: 10,
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  cartControl: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  itemQuantity: {
    marginHorizontal: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  itemPrice: {
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
  itemTotalPrice: {
    alignItems: "flex-end",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
