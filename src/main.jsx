import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { router } from "./routes/router";
import './index.css';
import AuthProvider from "./contexts/AuthProvider";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <AuthProvider>
    <RouterProvider router={router} />,
  </AuthProvider>
);
