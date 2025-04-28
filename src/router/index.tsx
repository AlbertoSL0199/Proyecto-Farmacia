import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { AboutPage, HomePage, MedPages ,ShipmentsPage } from "../pages";
import {  } from "../components/home/Shipments";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children:[
            {
                index:true,
                element: <HomePage/>,
            },
            {
                path:'envios',
                element: <ShipmentsPage/>,
            },
            {
                path:'medicamento',
                element: <MedPages/>,
            },
            {
                path:'nosotros',
                element: <AboutPage/>,
            }
        ]
    }
]
);
