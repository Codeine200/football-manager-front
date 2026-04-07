import {createBrowserRouter} from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import AdminLayout from "@/layout/AdminLayout";
import PlayersPage from "@/pages/PlayersPage/PlayersPage";
import TeamsPage from "@/pages/TeamsPage/TeamsPage";
import MatchesSchedulePage from "@/pages/MatchesSchedulePage/MatchesSchedulePage";
import MatchesResultPage from "@/pages/MatchesResultPage/MatchesResultPage";
import SeasonStatisticPage from "@/pages/MatchStatisticPage/SeasonStatisticPage";
import TeamDetailsPage from "@/pages/TeamDetailsPage/TeamDetailsPage";
import LoginPage from "@/pages/LoginPage/LoginPage";
import AdminTeamsPage from "@/pages/admin/AdminTeamsPage/AdminTeamsPage";
import AdminPlayersPage from "@/pages/admin/AdminPlayersPage/AdminPlayersPage";
import AdminMatchesPage from "@/pages/admin/AdminMatchesPage/AdminMatchesPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <TeamsPage /> },
            { path: "players", element: <PlayersPage /> },
            { path: "matches", element: <MatchesResultPage /> },
            { path: "teams", element: <TeamsPage /> },
            { path: "schedule", element: <MatchesSchedulePage /> },
            { path: "seasons", element: <SeasonStatisticPage /> },
            { path: "teams/:id", element: <TeamDetailsPage /> }
        ],
    },
    {
        path: "/admin/login",
        element: <LoginPage />
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            { index: true, element: <AdminTeamsPage /> },
            { path: "teams", element: <AdminTeamsPage /> },
            { path: "players", element: <AdminPlayersPage /> },
            { path: "matches", element: <AdminMatchesPage /> }
        ]
    }
]);