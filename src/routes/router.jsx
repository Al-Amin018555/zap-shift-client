import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from '../pages/Home/Home/Home'
import Coverage from "../pages/Coverage/Coverage";
import AboutUs from "../pages/AboutUs/AboutUs";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { index: true, Component: Home },
      {
        path: 'coverage',
        Component: Coverage,
        loader: () => fetch('serviceCenters.json').then(res => res.json()),
      },
      {
        path: '/aboutUs',
        Component: AboutUs ,
      }
    ]
  },
]);