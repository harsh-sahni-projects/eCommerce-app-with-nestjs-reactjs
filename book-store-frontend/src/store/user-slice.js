import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null
  },
  reducers: {
    setUser(state, action) {
      const userDetails = action.payload;
      state.user = userDetails;
    }
  }
});

export default userSlice.reducer;
export const userActions = userSlice.actions;