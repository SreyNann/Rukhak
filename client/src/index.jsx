import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { CartProvider } from "./contexts/user/CartContext";

// check if the current route is an admin route
const pathname = window.location.pathname;
const isAdminRoute =
  pathname.startsWith("/admin") || pathname.startsWith("/seller");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <CartProvider>
          <App isAdminRoute={isAdminRoute} />
        </CartProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
