import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  name: string;
  price: string;
  image: string | null;
  url?: string;
}

interface BucketState {
  products: Product[];
}

const initialState: BucketState = {
  products: [],
};

const bucketSlice = createSlice({
  name: "bucket",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products.splice(action.payload, 1);
    },
    clearBucket: (state) => {
      state.products = [];
    },
  },
});

export const { addProduct, removeProduct, clearBucket } = bucketSlice.actions;
export default bucketSlice.reducer;
