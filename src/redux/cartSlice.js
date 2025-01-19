import { createSlice } from "@reduxjs/toolkit";

// بارگذاری سبد خرید از localStorage
const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem("ziu_cart");
  return cartData ? JSON.parse(cartData) : { products: [], discount: null };
};

// مقدار اولیه از localStorage بارگذاری می‌شود
const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.products.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      // ذخیره داده‌های جدید در localStorage
      localStorage.setItem("ziu_cart", JSON.stringify(state));
    },

    incrementQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
      // ذخیره داده‌های جدید در localStorage
      localStorage.setItem("ziu_cart", JSON.stringify(state));
    },

    decrementQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      // ذخیره داده‌های جدید در localStorage
      localStorage.setItem("ziu_cart", JSON.stringify(state));
    },

    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
      // ذخیره داده‌های جدید در localStorage
      localStorage.setItem("ziu_cart", JSON.stringify(state));
    },

    applyDiscount: (state, action) => {
      state.discount = action.payload;
      // ذخیره داده‌های جدید در localStorage
      localStorage.setItem("ziu_cart", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  applyDiscount,
} = cartSlice.actions;

export default cartSlice.reducer;
