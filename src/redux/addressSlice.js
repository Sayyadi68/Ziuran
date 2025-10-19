import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstanceToken from '../api/axiosInstance';

// =======================
// ⚙️ Initial State
// =======================
const initialState = {
  provinces: [],
  cities: [],
  addresses: [], // ✅ حتماً آرایه
  isModalOpen: false,
  formData: {
    province: '',
    city: '',
    address: '',
    latitude: '',
    longitude: '',
    neighbourhood: '',
    notes: '',
    postal_code: '',
    receiver_first_name: '',
    receiver_last_name: '',
    receiver_phone: '',
  },
  isReceiverSelf: true,
  method: 'POST',
  addressId: null,
  errors: {},
};

// =======================
// 🚀 Async Thunks
// =======================

// 📍 گرفتن استان‌ها
export const fetchProvinces = createAsyncThunk(
  'address/fetchProvinces',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstanceToken.get('/provinces/');
      return data;
    } catch (err) {
      return rejectWithValue('خطا در دریافت استان‌ها');
    }
  }
);

// 📍 گرفتن شهرهای هر استان
export const fetchCities = createAsyncThunk(
  'address/fetchCities',
  async (provinceId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstanceToken.get(`/provinces/${provinceId}/cities/`);
      return data;
    } catch (err) {
      return rejectWithValue('خطا در دریافت شهرها');
    }
  }
);

// 📍 گرفتن لیست آدرس‌های کاربر
export const fetchAddresses = createAsyncThunk(
  'address/fetchAddresses',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstanceToken.get('/address/');
      // ✅ پشتیبانی از هر دو حالت (با pagination و بدون)
      if (Array.isArray(data)) {
        return data;
      } else if (data.results && Array.isArray(data.results)) {
        return data.results;
      } else {
        console.warn("Unexpected address data format:", data);
        return [];
      }
    } catch (err) {
      return rejectWithValue('خطا در دریافت لیست آدرس‌ها');
    }
  }
);

// 📍 گرفتن آدرس از مختصات نقشه
export const fetchAddress = createAsyncThunk(
  'address/fetchAddress',
  async ({ lat, lon }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstanceToken.get(`/reverse-geocode/?lat=${lat}&lng=${lon}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'خطا در گرفتن آدرس از نقشه');
    }
  }
);

// 📍 ایجاد یا ویرایش آدرس
export const submitAddress = createAsyncThunk(
  'address/submitAddress',
  async ({ formData, method, addressId }, { rejectWithValue, dispatch }) => {
    try {
      const url = method === 'POST' ? '/address/' : `/address/${addressId}/`;
      const { data } = await axiosInstanceToken({
        method: method === 'POST' ? 'POST' : 'PATCH',
        url,
        data: formData,
      });

      // ✅ بعد از ثبت یا ویرایش، دوباره لیست آدرس‌ها را بگیر
      await dispatch(fetchAddresses());

      return { method, data };
    } catch (err) {
      return rejectWithValue('مشکل در ثبت یا بروزرسانی آدرس');
    }
  }
);

// 📍 دریافت آدرس برای ویرایش
export const editAddress = createAsyncThunk(
  'address/editAddress',
  async (addressId, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axiosInstanceToken.get(`/address/${addressId}/`);
      const { data: cities } = await axiosInstanceToken.get(`/provinces/${data.province.id}/cities/`);
      dispatch(setCities(cities));
      return data;
    } catch (err) {
      return rejectWithValue('خطا در دریافت آدرس برای ویرایش');
    }
  }
);



// ✅ انتخاب آدرس فعال با Radio Button (معادل کد JS شما)
export const setActiveAddress = createAsyncThunk(
  'address/setActiveAddress',
  async (addressId, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axiosInstanceToken.post(`/address/${addressId}/set-active/`);
      dispatch(fetchAddresses()); // رفرش لیست آدرس‌ها
      // پیام موفقیت - اگه از Tailwind Message استفاده می‌کنی
      if (typeof window !== 'undefined' && window.showTailwindMessage) {
        window.showTailwindMessage('آدرس شما تغییر کرد', 'success');
      }
      if (window.location.pathname === '/basket/') {
        window.location.reload();
      }
      return data;
    } catch (err) {
      console.error('Error selecting address:', err);
      return rejectWithValue('خطا در تغییر آدرس فعال');
    }
  }
);


// =======================
// 🧩 Slice
// =======================
const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setModalOpen(state, action) {
      state.isModalOpen = action.payload;
    },
    setFormData(state, action) {
      state.formData = { ...state.formData, ...action.payload };
    },
    setReceiverSelf(state, action) {
      state.isReceiverSelf = action.payload;
    },
    setMethod(state, action) {
      state.method = action.payload;
    },
    setAddressId(state, action) {
      state.addressId = action.payload;
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
    setCities(state, action) {
      state.cities = action.payload;
    },
    resetForm(state) {
      state.formData = initialState.formData;
      state.isReceiverSelf = true;
      state.method = 'POST';
      state.addressId = null;
      state.errors = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // 📦 استان‌ها
      .addCase(fetchProvinces.fulfilled, (state, action) => {
        state.provinces = action.payload || [];
      })
      .addCase(fetchProvinces.rejected, (state, action) => {
        state.errors.provinces = action.payload;
      })

      // 🏙️ شهرها
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.cities = action.payload || [];
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.errors.cities = action.payload;
      })

      // 📬 آدرس‌ها
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload || [];
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.errors.fetch = action.payload;
      })

      // 📍 آدرس از نقشه
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.formData.neighbourhood = action.payload.neighbourhood || '';
        state.formData.address = action.payload.formatted_address || 'آدرس پیدا نشد';
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.errors.address = action.payload;
      })

      // 💾 ثبت / ویرایش آدرس
      .addCase(submitAddress.fulfilled, (state) => {
        state.isModalOpen = false;
        state.formData = initialState.formData;
        state.isReceiverSelf = true;
        state.method = 'POST';
        state.addressId = null;
        state.errors = {};
      })
      .addCase(submitAddress.rejected, (state, action) => {
        state.errors.submit = action.payload;
      })

      // ✏️ دریافت آدرس برای ویرایش
      .addCase(editAddress.fulfilled, (state, action) => {
        state.formData = {
          province: action.payload.province.id,
          city: action.payload.city.id,
          address: action.payload.address,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
          neighbourhood: action.payload.neighbourhood || '',
          notes: action.payload.notes,
          postal_code: action.payload.postal_code,
          receiver_first_name: action.payload.receiver_first_name,
          receiver_last_name: action.payload.receiver_last_name,
          receiver_phone: action.payload.receiver_phone,
        };
        state.isReceiverSelf = !action.payload.receiver_first_name && !action.payload.receiver_last_name;
        state.method = 'PATCH';
        state.addressId = action.payload.id;
        state.isModalOpen = true;
      })
      .addCase(editAddress.rejected, (state, action) => {
        state.errors.edit = action.payload;
      });
  },
});

export const {
  setModalOpen,
  setFormData,
  setReceiverSelf,
  setMethod,
  setAddressId,
  setErrors,
  setCities,
  resetForm,
} = addressSlice.actions;

export default addressSlice.reducer;
