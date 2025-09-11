import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { inspectionReducer } from "../features/inspection/inspectionSlice";
import { authReducer } from "../features/auth/authSlice";
import { adminReducer } from "../features/admin/adminSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import { bulkReducer } from "../features/bulk/bulkSlice";
import { userReducer } from "../features/user/userSlice";

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

const adminPersistConfig = {
  key: "admin",
  storage: storage,
  whitelist: [],
};

const dashboardPersistConfig = {
  key: "dashboard",
  storage: storage,
  whitelist: [],
};

const bulkPersistConfig = {
  key: "bulk",
  storage: storage,
  whitelist: [],
};

const userPersistConfig = {
  key: "user",
  storage: storage,
  whitelist: ["user"],
};

const appReducer = combineReducers({
  inspection: persistReducer(inspectionPersistConfig, inspectionReducer),
  auth: persistReducer(authPersistConfig, authReducer),
  admin: persistReducer(adminPersistConfig, adminReducer),
  dashboard: persistReducer(dashboardPersistConfig, dashboardReducer),
  bulk: persistReducer(bulkPersistConfig, bulkReducer),
  user: persistReducer(userPersistConfig, userReducer),
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "auth/logout/fulfilled") {
    // Clear the persisted state
    storage.removeItem("persist:auth");
    storage.removeItem("persist:inspection");
    storage.removeItem("persist:admin");
    storage.removeItem("persist:dashboard");
    storage.removeItem("persist:bulk");
    storage.removeItem("persist:user");
    storage.removeItem("persist:root");
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
