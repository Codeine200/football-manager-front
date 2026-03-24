import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import PlayersPage from "@/pages/PlayersPage/PlayersPage";
import TeamsPage from "@/pages/TeamsPage/TeamsPage";
import Matches from "@/pages/Matches";
import TeamDetails from "@/pages/TeamDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <TeamsPage /> },
            { path: "players", element: <PlayersPage /> },
            { path: "matches", element: <Matches /> },
            { path: "teams", element: <TeamsPage /> },
            { path: "schedule", element: <TeamsPage /> },
            { path: "seasons", element: <TeamsPage /> },
            { path: "teams/:id", element: <TeamDetails /> }
        ],
    },
]);