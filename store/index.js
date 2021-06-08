import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import post from "./post/slice";

const reducer = combineReducers({ post });

const store = configureStore({
  reducer,
});

export default store;
