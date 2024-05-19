import { createSlice } from '@reduxjs/toolkit';

// Load products from localStorage
const loadProducts = () => {
  if (typeof window !== "undefined") {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  }
  return [];
};

const productsSlice = createSlice({
  name: 'products',
  initialState: loadProducts(),
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
      localStorage.setItem('products', JSON.stringify(state));
    },
    updateProduct: (state, action) => {
      const { id, name, quantity, price } = action.payload;
      const existingProduct = state.find(product => product.id === id);
      if (existingProduct) {
        existingProduct.name = name;
        existingProduct.quantity = quantity;
        existingProduct.price = price;
        localStorage.setItem('products', JSON.stringify(state));
      }
    },
    deleteProduct: (state, action) => {
      const newState = state.filter(product => product.id !== action.payload);
      localStorage.setItem('products', JSON.stringify(newState));
      return newState;
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } = productsSlice.actions;

export default productsSlice.reducer;
