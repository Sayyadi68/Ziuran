import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './redux/cartSlice';
import userReducer from './redux/userSlice';
import addressReducer from './redux/addressSlice';
import checkoutReducer from './redux/checkoutSlice';
import { fetchUser, logout, updateUser } from './redux/userSlice';

// Load cart from localStorage
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('ziu_cart');
  if (savedCart) {
    return JSON.parse(savedCart);
  }
  return { items: [] };
};

const preloadedState = {
  cart: loadCartFromLocalStorage(),
  user: undefined,
  address: undefined, // Initial state for addressReducer
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    address: addressReducer,
    checkout: checkoutReducer,
  },
  preloadedState,
});

// Save cart to localStorage on state changes
store.subscribe(() => {
  const cartState = store.getState().cart;
  localStorage.setItem('ziu_cart', JSON.stringify(cartState));
});

export default store;
export { fetchUser, logout, updateUser };