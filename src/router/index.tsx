import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import {
  AboutPage,
  HomePage,
  MedsPages,
  ShipmentsPage,
  MedPage,
  LoginPage,
  RegisterPage,
  OrdersPage,
  ThankyouPage,
  OrderUserPage,
  DashboardProductsPage,
  DashboardNewProductsPage,
} from "../pages";
import { ClientLayout } from "../layouts/ClientLayout";
import { CheckOutPage } from "../pages/CheckOutPage";
import { DashboardLayout } from "../layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "medicamentos",
        element: <MedsPages />,
      },
      //define el path para la ruta de los productos
      {
        path: "medicamentos/:slug",
        element: <MedPage />,
      },
      {
        path: "envios",
        element: <ShipmentsPage />,
      },
      {
        path: "nosotros",
        element: <AboutPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "registro",
        element: <RegisterPage />,
      },
      {
        path: "account",
        element: <ClientLayout />,
        children: [
          {
            // define el path para la ruta de los pedidos
            //redirecciona a la ruta de pedidos
            path: "",
            element: <Navigate to="/account/pedidos" />,
          },
          {
            path: "pedidos",
            element: <OrdersPage />,
          },
          {
            path: "pedidos/:id",
            element: <OrderUserPage />,
          },
        ],
      },
    ],
  },
  // define el path para la ruta de checkout
  //ya no esta envuelto en el layout de RootLayout (diferencia de anteriores paginas)
  {
    path: "checkout",
    element: <CheckOutPage />,
  },
  {
    path: "checkout/:id/thank-you",
    element: <ThankyouPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/productos" />,
      },
      { path: "productos", element: <DashboardProductsPage/> },
      { path: "productos/new", element: <DashboardNewProductsPage/> },
    ],
  },
]);
