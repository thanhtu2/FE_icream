import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thực hiện gọi API để lấy thông tin người dùng
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (token, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:4000/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data; // Trả về dữ liệu từ phản hồi của API nếu thành công
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Đã xảy ra lỗi không xác định');
    }
  }
);

// Thực hiện gọi API để đặt hàng
export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async ({ order }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:4000/orders', order);
      console.log('API Response:', response.data); // Thêm log để kiểm tra phản hồi từ API
      return response.data;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message); // Log lỗi từ API
      return thunkAPI.rejectWithValue(error.response?.data || 'Đã xảy ra lỗi không xác định');
    }
  }
);

const initialState = {
  order: null,
  status: 'idle',
  error: null,
  user: null,
  userStatus: 'idle',
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // Xóa đơn hàng và đặt lại trạng thái ban đầu
    clearOrder: (state) => {
      state.order = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.userStatus = 'loading'; // Đặt trạng thái thành 'loading' khi API đang được gọi
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userStatus = 'succeeded'; // Đặt trạng thái thành 'succeeded' khi API trả về thành công
        state.user = action.payload; // Lưu dữ liệu phản hồi của API vào state.user
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.userStatus = 'failed'; // Đặt trạng thái thành 'failed' khi API trả về lỗi
        state.error = action.payload; // Lưu thông tin lỗi vào state.error
      })
      .addCase(placeOrder.pending, (state) => {
        state.status = 'loading'; // Đặt trạng thái thành 'loading' khi API đang được gọi
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Đặt trạng thái thành 'succeeded' khi API trả về thành công
        state.order = action.payload; // Lưu dữ liệu phản hồi của API vào state.order
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = 'failed'; // Đặt trạng thái thành 'failed' khi API trả về lỗi
        state.error = action.payload; // Lưu thông tin lỗi vào state.error
      });
  },
});

// Xuất ra action và reducer để sử dụng
export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
