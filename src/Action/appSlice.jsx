// appSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  apps: [],
  loading: false,
  error: null,
};

export const fetchApps = createAsyncThunk('apps/fetchApps', async (_, thunkAPI) => {
  try {
    const response = await axios.get('http://go-dev.greedygame.com/v3/dummy/apps');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const appSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApps.fulfilled, (state, action) => {
        state.loading = false;
        state.apps = action.payload.data;
      })
      .addCase(fetchApps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default appSlice.reducer;
