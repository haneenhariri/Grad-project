import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { imgProfile } from "../../services/profileStd";

interface ProfileState {
  name: string;
  profile_picture?: string;
  status: "idle" | "loading" | "failed";
}

const initialState: ProfileState = {
  name: "User",
  profile_picture: undefined,
  status: "idle",
};

export const fetchProfile = createAsyncThunk("profile/fetchProfile", async () => {
  const response = await imgProfile();
  return response.data;
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.name = action.payload.name;
      state.profile_picture = action.payload.profile_picture;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "idle";
        state.name = action.payload.name;
        state.profile_picture = action.payload.profile_picture;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
