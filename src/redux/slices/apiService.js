// src/services/api.js
import axios from 'axios';


export const placeOrder = async (orderDetails) => {
  try {
    const response = await axios.post(`http://localhost:4000/orders`, orderDetails);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error('Error placing order:', errorMessage);
    throw new Error(errorMessage);
  }
};

// Xóa đơn hàng
export const clearOrder = async () => {
  try {
    await axios.delete(`http://localhost:4000/orders`);
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error('Error clearing orders:', errorMessage);
    throw new Error(errorMessage);
  }
};
