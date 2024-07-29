import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (orderDetails, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:4000/orders', orderDetails);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.order = action.payload; // Đảm bảo rằng dữ liệu phản hồi được lưu trữ trong state.order
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
