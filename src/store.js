import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './redux/cartSlice';
import userReducer from "./redux/userSlice"; // فقط reducer
import { fetchUser, logout, updateUser } from "./redux/userSlice"; // thunkها رو از slice import کن و re-export اگر می‌خوای

// بارگذاری اطلاعات سبد خرید از localStorage
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('ziu_cart');
  if (savedCart) {
    return JSON.parse(savedCart);
  }
  return { items: [] };
};

const preloadedState = {
  cart: loadCartFromLocalStorage(),
  user: undefined, // state اولیه userReducer
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
  preloadedState,
});

// ذخیره اطلاعات سبد خرید در localStorage هر بار که تغییری در ریداکس انجام می‌شود
store.subscribe(() => {
  const cartState = store.getState().cart;
  localStorage.setItem('ziu_cart', JSON.stringify(cartState));
});

export default store;
export { fetchUser, logout, updateUser }; // حالا درست export می‌شه (از slice import شدن)