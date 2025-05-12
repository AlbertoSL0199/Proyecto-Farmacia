import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import {
  AboutPage,
  HomePage,
  MedsPages,
  ShipmentsPage,
  MedPage,
} from "../pages";

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
    ],
  },
]);
