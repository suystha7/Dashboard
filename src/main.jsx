import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import "./index.css"; 


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>  {/* ✅ BrowserRouter should ONLY be here */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
