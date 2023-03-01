import { configureStore } from "@reduxjs/toolkit";
import { dashBoardReducer } from "../features/dashboard/dashboardSlice";
import { userReducer } from "../features/login/loginSlice";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage
};
const userPersistedReducer = persistReducer(persistConfig, userReducer);
const store = configureStore({
  reducer: {
    user: userPersistedReducer,
    dashboard : dashBoardReducer 
  },
});

export default store;
