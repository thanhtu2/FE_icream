import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  discount: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        i => i.ProductID === item.ProductID,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(i => i.ProductID !== itemId);
    },
    updateQuantity: (state, action) => {
      const { ProductID, quantity } = action.payload;
      const item = state.cartItems.find(i => i.ProductID === ProductID);
      if (item) {
        item.quantity = quantity;
      }
    },
    updateDiscount: (state, action) => {
      state.discount = action.payload;
      console.log(state.discount)
      if (state.discount) {
        state.cartItems.forEach(item => {
          if (item.ProductID === state.discount.ProductID) {
            const discountPrice =
              item.Price - item.Price * state.discount.DiscountPercent / 100;
            item.Price = discountPrice;
          }
        });
      }
    },
    clearCart: state => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, updateDiscount } =
  cartSlice.actions;
export default cartSlice.reducer;
