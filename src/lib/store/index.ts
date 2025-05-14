import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { inspectionReducer } from "../features/inspection/inspectionSlice";
import { authReducer } from "../features/auth/authSlice";

const inspectionPersistConfig = {
  key: "inspection",
  storage: storage,
  whitelist: ["token", "id"],
};

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["accessToken", "user"],
};

const appReducer = combineReducers({
  inspection: persistReducer(inspectionPersistConfig, inspectionReducer),
  auth: persistReducer(authPersistConfig, authReducer),
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "auth/logout") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
