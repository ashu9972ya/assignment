// store.js
import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './Action/apiSlice';
import appReducer from "./Action/appSlice"
const store = configureStore({
  reducer: {
    api: apiReducer,
    apps: appReducer,
  },
});

export default store;
