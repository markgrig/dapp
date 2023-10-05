import { createSlice } from "@reduxjs/toolkit";
import { Eip1193Provider, BrowserProvider } from "ethers";
import { connectWallet } from "./asyncActions/connectWallet";

declare global {
  interface Window {
    ethereum: Eip1193Provider & BrowserProvider;
  }
}

const initialState = {
  isConnecting: false,
  isValidNetwork: false,
  error: "",
  message: {
    head: "",
    text: ""
  },
  address: "",
};

export const accountAddressSlice = createSlice({
  name: "accountAddress",
  initialState,
  reducers: {
    setAddress(state, action) {
      state.address = action.payload;
    },
    setMessage(state, action) {
      const {head, text} = action.payload
      state.message ={
        head: head,
        text: text
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectWallet.fulfilled, (state, action) => {
        state.isConnecting = false;
        state.address = action.payload as string;
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

export default accountAddressSlice.reducer;