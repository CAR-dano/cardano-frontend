import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { inspectionReducer } from "../features/inspection/inspectionSlice";

// Config persist untuk inspection slice
const inspectionPersistConfig = {
  key: "inspection",
  storage: storage,
  whitelist: ["token", "id"], // hanya data ini yang akan disimpan di localStorage
};

// Gabungkan reducer (bisa ditambah auth, dll)
const appReducer = combineReducers({
  inspection: persistReducer(inspectionPersistConfig, inspectionReducer),
  // auth: persistReducer(authPersistConfig, authReducer), // jika ada auth
});

// Root reducer untuk handling global action seperti logout
const rootReducer = (state: any, action: any) => {
  // if (action.type === "auth/logout") {
  //   return appReducer(undefined, action); // reset semua state
  // }
  return appReducer(state, action);
};

// Buat store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // perlu karena redux-persist menggunakan non-serializable data
    }),
});

// Buat persistor
export const persistor = persistStore(store);

// Types untuk useSelector dan useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
