import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileResponse, State } from "../types/types";
import { saveUserData } from "./actions";

const initialState: State = { token: null, refreshToken: null, profile: null, staff: null }

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      saveUserData(
        state: State,
        action: PayloadAction<{ token: string; refreshToken: string; profile: ProfileResponse, staff: boolean}>
      ) {
        state.refreshToken = action.payload.refreshToken;
        state.token = action.payload.token;
        state.profile = action.payload.profile;
        state.staff = action.payload.staff;
      },

      logout(state: State) {
        state.profile = null;
        state.refreshToken = null;
        state.token = null;
        state.staff = null;
      },
    },
  });
  
  export default authSlice;