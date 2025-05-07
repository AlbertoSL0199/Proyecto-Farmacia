import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import {
  AboutPage,
  HomePage,
  MedPages,
  ShipmentsPage,
  MedPage
} from "../pages";
import {} from "../components/home/Shipments";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "envios",
        element: <ShipmentsPage />,
      },
      //define el path para la ruta de los productos
      {
        path: "medicamentos/:slug",
        element: <MedPage />,
      },
      {
        path: "medicamentos",
        element: <MedPages />,
      },
      {
        path: "nosotros",
        element: <AboutPage />,
      },
    ],
  },
]);
