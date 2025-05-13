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
} from "../pages";
import { ClientLayout } from "../layouts/ClientLayout";

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
            element: <Navigate to="/account/pedidos"/>,
          },
          {
            path: "pedidos",
            element: <OrdersPage />,
          },
        ],
      },
    ],
  },
]);
