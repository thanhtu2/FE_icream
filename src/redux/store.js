import { configureStore } from '@reduxjs/toolkit';
// import productReducer from './slices/productSlice';
import { thunk } from 'redux-thunk';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice'
import authReducer from './slices/authSlice';
import orderReducer from './slices/orderSlice';
export const store = configureStore({
  reducer: {
    // products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    order: orderReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),

});
