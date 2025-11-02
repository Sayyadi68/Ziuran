// index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./store.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "jalaali-react-date-picker/lib/styles/index.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastContainer
      position="top-center"   // بالا وسط
      autoClose={3000}        // بسته شدن خودکار بعد از 3 ثانیه
      hideProgressBar         // نوار پیشرفت رو مخفی می‌کنه
      newestOnTop={true}      // جدیدترین Toast روی بالاست
      closeOnClick
      rtl={true}              // راست به چپ (فارسی)
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <App />
  </Provider>
);
