import { createRoot } from "react-dom/client";
import { AuthProvider } from "./contexts/AuthContext";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import store from "./store/index.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <NextUIProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </NextUIProvider>
  </Provider>
);
