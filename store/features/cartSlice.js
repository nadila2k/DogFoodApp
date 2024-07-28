import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;

      // Check item is already added
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity = existingItem.quantity + 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }

      state.totalItems = state.totalItems + 1;
      state.totalPrice = state.totalPrice + newItem.price;
    },
    removeItem(state, action) {
      const itemId = action.payload;

      // Get item from the cart
      const existingItem = state.items.find((item) => item.id === itemId);

      console.log("existingItem", existingItem);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== itemId);
        } else {
          existingItem.quantity = existingItem.quantity - 1;
        }

        state.totalItems = state.totalItems - 1;
        state.totalPrice = state.totalPrice - existingItem.price;
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
