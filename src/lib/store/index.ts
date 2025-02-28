import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
// import { authReducer } from "./features/auth/authSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import { categoriesReducer } from "../features/category/categorySlice";
// import { articleReducer } from "../features/article/articleSlice";

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["isAuthenticated", "user", "token"],
};

const appReducer = combineReducers({
  // auth: persistReducer(authPersistConfig, authReducer),
});

// const rootReducer = (state: any, action: any) => {
//   if (action.type === "auth/logout") {
//     return appReducer(undefined, action);
//   }
//   return appReducer(state, action);
// };

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
