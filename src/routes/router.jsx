import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from '../pages/Home/Home/Home'
import Coverage from "../pages/Coverage/Coverage";
import AboutUs from "../pages/AboutUs/AboutUs";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoutes from './PrivateRoutes';
import Rider from "../pages/Rider/Rider";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashBoardLayout from "../layouts/DashBoardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { index: true, Component: Home },
      {
        path: 'send-parcel',
        element: <PrivateRoutes><SendParcel></SendParcel></PrivateRoutes>,
        loader: () => fetch('serviceCenters.json').then(res => res.json()),
      },
      {
        path: 'coverage',
        Component: Coverage,
        loader: () => fetch('serviceCenters.json').then(res => res.json()),
      },
      {
        path: 'rider',
        element: <PrivateRoutes><Rider></Rider></PrivateRoutes>,
        loader: () => fetch('serviceCenters.json').then(res => res.json()),
      },
      {
        path: 'aboutUs',
        Component: AboutUs,
      }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoutes><DashBoardLayout></DashBoardLayout></PrivateRoutes>,
    children: [
      {
        path: 'my-parcels',
        Component: MyParcels,
      },
      {
        path: 'parcels/:parcelId',
        Component: Payment
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess,
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancelled,
      },
      {
        path: 'payment-history',
        Component: PaymentHistory,
      }
    ]
  }
]);