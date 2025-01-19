import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './redux/cartSlice';

// بارگذاری اطلاعات سبد خرید از localStorage
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('ziu_cart');
  if (savedCart) {
    return JSON.parse(savedCart);
  }
  return { items: [] };
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: loadCartFromLocalStorage(),
});

// ذخیره اطلاعات سبد خرید در localStorage هر بار که تغییری در ریداکس انجام می‌شود
store.subscribe(() => {
  const cartState = store.getState().cart;
  localStorage.setItem('ziu_cart', JSON.stringify(cartState));
});

export default store;
