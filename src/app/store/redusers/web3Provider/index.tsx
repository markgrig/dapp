import { createSlice } from "@reduxjs/toolkit";
import { Eip1193Provider, BrowserProvider } from "ethers";
import { connectWallet } from "./asuncActions/connectWallet";

declare global {
  interface Window {
    ethereum: Eip1193Provider & BrowserProvider;
  }
}

const initialState = {
  isConnecting: false,
  error: "",
  address: "",
};

export const web3ProviderSlice = createSlice({
  name: "web3Provider",
  initialState,
  reducers: {
    setAddress(state, action) {
      state.address = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectWallet.fulfilled, (state, action) => {
        state.isConnecting = false;
        state.address = action.payload;
      })
      .addCase(connectWallet.pending, (state) => {
        state.isConnecting = true;
        state.error = "";
      })
      .addCase(connectWallet.rejected, (state, action) => {
        state.isConnecting = false;
        state.error = action.payload as string;
      });
  },
});

export default web3ProviderSlice.reducer;
