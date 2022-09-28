import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { request } from "../utils/http";
import { AppDispatch } from "./store";

const checkTokenRequest = (token: any, dispatch: AppDispatch) => {
  request("/back/tutor?page=0&limit=1&state=-1", { token }, dispatch);
};

export const checkToken = createAsyncThunk(
  "checkToken",
  async (dispatch: AppDispatch) => {
    let token = window.localStorage.getItem("token");
    if (token) {
      try {
        checkTokenRequest(token, dispatch);
        return true;
      } catch (e) {
        return false;
      }
    } else return false;
  }
);

interface useState {
  user: boolean | null;
}

const initialState: useState = {
  user: false,
};

const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: useState, action: PayloadAction<boolean>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (build) => {
    build.addCase(
      checkToken.fulfilled,
      (state: useState, action: PayloadAction<boolean>) => {
        state.user = action.payload;
      }
    );
  },
});

export const { setUser } = loginSlice.actions;

export default loginSlice.reducer;
