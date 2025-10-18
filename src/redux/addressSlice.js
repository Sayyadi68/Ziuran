import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstanceToken from '../api/axiosInstance';

// =======================
// ⚙️ Initial State
// =======================
const initialState = {
  addresses: [], // ✅ اضافه شد
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
  cities: [],
};

// گرفتن همه‌ی آدرس‌ها
export const fetchAddresses = createAsyncThunk(
  'address/fetchAddresses',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstanceToken.get('/address/');
      return data;
    } catch (err) {
      return rejectWithValue('خطا در دریافت لیست آدرس‌ها');
    }
  }
);

// گرفتن آدرس از مختصات
export const fetchAddress = createAsyncThunk(
  'address/fetchAddress',
  async ({ lat, lon }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstanceToken.get(`/reverse-geocode/?lat=${lat}&lng=${lon}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'خطا در گرفتن آدرس');
    }
  }
);

// گرفتن شهرهای هر استان
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

// ایجاد یا ویرایش آدرس
export const submitAddress = createAsyncThunk(
  'address/submitAddress',
  async ({ formData, method, addressId }, { rejectWithValue }) => {
    try {
      const url = method === 'POST' ? '/address/' : `/address/${addressId}/`;
      const { data } = await axiosInstanceToken({
        method: method === 'POST' ? 'POST' : 'PATCH',
        url,
        data: formData,
      });
      return { method, data };
    } catch (err) {
      return rejectWithValue('مشکل در ساخت یا بروزرسانی آدرس');
    }
  }
);

// ویرایش آدرس
export const editAddress = createAsyncThunk(
  'address/editAddress',
  async (addressId, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axiosInstanceToken.get(`/address/${addressId}/`);
      const { data: cities } = await axiosInstanceToken.get(`/provinces/${data.province.id}/cities/`);
      dispatch(setCities(cities));
      return data;
    } catch (err) {
      return rejectWithValue('خطا در دریافت آدرس');
    }
  }
);



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
      // 📍 دریافت لیست آدرس‌ها
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.errors.fetch = action.payload;
      })

      // 📍 دریافت آدرس از مختصات
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.formData.neighbourhood = action.payload.neighbourhood || '';
        state.formData.address = action.payload.formatted_address || 'آدرس پیدا نشد';
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.errors.address = action.payload;
      })

      // 📍 دریافت شهرها
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.errors.cities = action.payload;
      })

      // 📍 ارسال یا بروزرسانی آدرس
      .addCase(submitAddress.fulfilled, (state, action) => {
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

      // 📍 ویرایش آدرس
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