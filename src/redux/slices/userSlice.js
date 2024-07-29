// src/redux/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';
const userSlice = createSlice({
  name: 'user',
  initialState: {
    CustomerID: null,
    // Các thuộc tính khác
  },
  reducers: {
    setUser(state, action) {
      const { token } = action.payload;
      const decodedToken = jwtDecode(token);

      if (decodedToken) {
        state.CustomerID = decodedToken.CustomerID; // Lưu CustomerID từ token vào state
        // Cập nhật các thuộc tính khác nếu cần
      }
    },
    // Các reducers khác
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
