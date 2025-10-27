import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

// دریافت اطلاعات سبد خرید
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/checkout/');
      console.log("API /checkout/ response:", response.data);
      const cart = Array.isArray(response.data) ? response.data[0] : response.data;

      // ذخیره UUID در localStorage اگر وجود نداشت
      if (cart?.cart_uuid && !localStorage.getItem('cartUuid')) {
        localStorage.setItem('cartUuid', cart.cart_uuid);
      }

      return cart;
    } catch (error) {
      console.error("API /checkout/ error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.error || 'خطایی در دریافت سبد خرید رخ داد');
    }
  }
);

// اضافه کردن آیتم به سبد خرید
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

      // ذخیره UUID در localStorage اگر وجود نداشت
      if (cart?.uuid && !localStorage.getItem('cartUuid')) {
        localStorage.setItem('cartUuid', cart.uuid);
      }

      console.log("API /carts/ POST response:", response.data);
      return cart;
    } catch (error) {
      console.error("API /carts/ POST error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.error || 'خطا در اضافه کردن آیتم');
    }
  }
);

// به‌روزرسانی تعداد آیتم
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
      return rejectWithValue(error.response?.data?.error || 'خطا در به‌روزرسانی تعداد');
    }
  }
);

// حذف آیتم از سبد خرید
export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async ({ itemId, cartUuid }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/carts/${cartUuid}/items/${itemId}/`);
      console.log("API DELETE success");
      return { itemId };
    } catch (error) {
      console.error("API DELETE error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.error || 'خطا در حذف آیتم');
    }
  }
);

// اعمال کد تخفیف
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
      return rejectWithValue(error.response?.data?.error || 'خطا در اعمال کد تخفیف');
    }
  }
);

// شروع فرآیند پرداخت
export const initiatePayment = createAsyncThunk(
  'cart/initiatePayment',
  async ({ cartUuid, delivery_date_jalali, delivery_slot_range }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/checkout/`, {
        cart_uuid: cartUuid,
        delivery_date_jalali,
        delivery_slot_range,
      });
      console.log("API /checkout/ response:", response.data);
      return response.data;
    } catch (error) {
      console.error("API /checkout/ error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.error || 'خطا در شروع پرداخت');
    }
  }
);

// پردازش خرید
export const processCheckout = createAsyncThunk(
  'cart/processCheckout',
  async ({ delivery_date_jalali, delivery_slot_range }, { getState, rejectWithValue }) => {
    try {
      const { cartUuid } = getState().cart;
      const response = await axiosInstance.post('/checkout/', {
        cart_uuid: cartUuid,
        delivery_date_jalali,
        delivery_slot_range,
      });
      console.log("API /checkout/ response:", response.data);
      return response.data;
    } catch (error) {
      console.error("API /checkout/ error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.error || 'خطای سرور');
    }
  }
);

// تأیید پرداخت
export const verifyPayment = createAsyncThunk(
  'cart/verifyPayment',
  async ({ authority, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/payment-verify/verify/', {
        params: { Authority: authority, Status: status },
      });
      console.log("API /payment-verify/verify/ response:", response.data);
      return response.data;
    } catch (error) {
      console.error("API /payment-verify/verify/ error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.error || 'خطا در تأیید پرداخت');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: null,
    items: [],
    cartUuid: localStorage.getItem('cartUuid') || null,
    total_price: 0,
    discount: null,
    status: 'idle',
    loading: false,
    error: null,
    message: null,
    success: false,
    redirectToGateway: false,
    paymentUrl: null,
    shortage: null,
    redirectUrl: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = null;
      state.items = [];
      state.cartUuid = null;
      state.total_price = 0;
      state.discount = null;
      state.status = 'idle';
      state.loading = false;
      state.error = null;
      state.message = null;
      state.success = false;
      state.redirectToGateway = false;
      state.paymentUrl = null;
      state.shortage = null;
      state.redirectUrl = null;
      localStorage.removeItem('cartUuid');
    },
  },
  extraReducers: (builder) => {
    // fetchCart
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.cart = action.payload;
        state.items = action.payload.cart_items || [];
        state.cartUuid = action.payload.cart_uuid || state.cartUuid;
        state.total_price = action.payload.payable_amount || 0;
        state.discount = action.payload.discount || null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload;
      })
      // addItemToCart
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
      // updateItemQuantity
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items || state.items;
        state.total_price = action.payload.total_price ?? state.total_price;
      })
      .addCase(updateItemQuantity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // removeItemFromCart
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter((item) => item.id !== action.payload.itemId);
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // applyDiscount
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
      // initiatePayment
      .addCase(initiatePayment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.success = action.payload.success;
        state.message = action.payload.message;
        if (action.payload.redirect_to_gateway) {
          state.redirectToGateway = true;
          state.paymentUrl = action.payload.payment_url;
          state.shortage = action.payload.shortage;
        } else if (action.payload.redirect_url) {
          state.redirectUrl = action.payload.redirect_url;
        }
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // processCheckout
      .addCase(processCheckout.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(processCheckout.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
        if (action.payload.redirect_to_gateway) {
          state.redirectToGateway = true;
          state.paymentUrl = action.payload.payment_url;
          state.shortage = action.payload.shortage;
        } else if (action.payload.redirect_url) {
          state.redirectUrl = action.payload.redirect_url;
        }
      })
      .addCase(processCheckout.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload;
      })
      // verifyPayment
      .addCase(verifyPayment.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
        state.items = [];
        state.cartUuid = null;
        state.total_price = 0;
        state.discount = null;
        state.cart = null;
        if (action.payload.redirect_url) {
          state.redirectUrl = action.payload.redirect_url;
        }
        localStorage.removeItem('cartUuid');
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;