import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import PlayersPage from "@/pages/PlayersPage/PlayersPage.tsx";
import Matches from "@/pages/Matches";
import Teams from "@/pages/Teams";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <PlayersPage /> },
            { path: "players", element: <PlayersPage /> },
            { path: "matches", element: <Matches /> },
            { path: "teams", element: <Teams /> },
            { path: "schedule", element: <Teams /> },
            { path: "seasons", element: <Teams /> },
        ],
    },
]);