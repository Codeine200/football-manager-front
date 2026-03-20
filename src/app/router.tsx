import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

import Players from "../pages/Players";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [

            {
                index: true,
                element: <Players />,
            },
        ],
    },
]);