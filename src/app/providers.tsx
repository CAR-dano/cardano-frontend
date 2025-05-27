"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../lib/store";
import LoadingScreen from "@/components/LoadingFullScreen";
import AuthInitializer from "@/components/Auth/AuthInitializer";
import { ThemeProvider } from "@/contexts/ThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<LoadingScreen message="Loading app state..." />}
        persistor={persistor}
      >
        <ThemeProvider>
          <AuthInitializer>{children}</AuthInitializer>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
