import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Players from "../pages/Players";
import Matches from "../pages/Matches";
import Teams from "../pages/Teams";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Players /> },
            { path: "matches", element: <Matches /> },
            { path: "teams", element: <Teams /> },
        ],
    },
]);