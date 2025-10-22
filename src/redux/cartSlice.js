import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance'; 


export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const cartUuid = localStorage.getItem('cartUuid');
      let response;

      if (cartUuid) {
        response = await axiosInstance.get(`/carts/${cartUuid}/`);
      } else {
        response = await axiosInstance.get(`/carts/`);
      }

      console.log("API /carts/ response:", response.data);
      const cart = Array.isArray(response.data)
        ? response.data[0]
        : response.data;

      // ذخیره UUID در localStorage اگر وجود نداشت
      if (cart?.uuid) {
        localStorage.setItem('cartUuid', cart.uuid);
      }

      return cart;
    } catch (error) {
      console.error("API /carts/ error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch cart');
    }
  }
);

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async ({ productId, quantity = 1 }, { getState, rejectWithValue }) => {
    try {
      const { cartUuid } = getState().cart;
      const cart_uuid = cartUuid || localStorage.getItem('cartUuid');
      const payload = { product: productId, quantity };
      if (cart_uuid) payload.cart_uuid = cart_uuid;

      const response = await axiosInstance.post(`/carts/`, payload);
      const cart = Array.isArray(response.data) ? response.data[0] : response.data;

      // ✅ فقط یکبار UUID ذخیره شود
      if (cart?.uuid && !localStorage.getItem('cartUuid')) {
        localStorage.setItem('cartUuid', cart.uuid);
      }

      console.log("API /carts/ POST response:", response.data);
      return cart;
    } catch (error) {
      console.error("API /carts/ POST error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.error || 'Failed to add item');
    }
  }
);

export const updateItemQuantity = createAsyncThunk(
  'cart/updateItemQuantity',
  async ({ itemId, cartUuid, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/carts/${cartUuid}/items/${itemId}/`,
        { quantity }
      );
      console.log("API PATCH response:", response.data);
      return Array.isArray(response.data) ? response.data[0] : response.data;
    } catch (error) {
      console.error("API PATCH error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.error || 'Failed to update quantity');
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async ({ itemId, cartUuid }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/carts/${cartUuid}/items/${itemId}/`);
      console.log("API DELETE success");
      return { itemId };
    } catch (error) {
      console.error("API DELETE error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.error || 'Failed to remove item');
    }
  }
);

export const applyDiscount = createAsyncThunk(
  'cart/applyDiscount',
  async (discountCode, { rejectWithValue }) => {
    try {
      const cartUuid = localStorage.getItem('cartUuid');
      const response = await axiosInstance.post(`/apply-discount/`, {
        code: discountCode,
        cart_uuid: cartUuid,
      });
      console.log("API /apply-discount/ response:", response.data);
      return response.data;
    } catch (error) {
      console.error("API /apply-discount/ error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.error || 'Failed to apply discount');
    }
  }
);

export const initiatePayment = createAsyncThunk(
  'cart/initiatePayment',
  async ({ cartUuid }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/checkout/`, { cart_uuid: cartUuid });
      console.log("API /checkout/ response:", response.data);
      return response.data;
    } catch (error) {
      console.error("API /checkout/ error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.error || 'Failed to initiate payment');
    }
  }
);

// ------------------ Slice ------------------

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    cartUuid: localStorage.getItem('cartUuid') || null,
    total_price: 0,
    discount: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.cartUuid = null;
      state.total_price = 0;
      state.discount = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('cartUuid'); // ✅ پاک کردن uuid از localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items || [];
        state.cartUuid = action.payload.uuid || state.cartUuid;
        state.total_price = action.payload.total_price || 0;
        state.discount = action.payload.discount || null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items || state.items;
        state.cartUuid = action.payload.uuid || state.cartUuid;
        state.total_price = action.payload.total_price ?? state.total_price;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items || state.items;
        state.total_price = action.payload.total_price ?? state.total_price;
      })
      .addCase(updateItemQuantity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter((item) => item.id !== action.payload.itemId);
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(applyDiscount.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.discount = action.payload.discount || action.payload;
        if (action.payload.total_price !== undefined) {
          state.total_price = action.payload.total_price;
        }
      })
      .addCase(applyDiscount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(initiatePayment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload?.payment_url) {
          window.location.href = action.payload.payment_url;
        }
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
