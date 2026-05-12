import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { router } from "./routes/router";
import './index.css';

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />,
);
