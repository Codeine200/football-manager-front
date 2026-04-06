import {createBrowserRouter} from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import PlayersPage from "@/pages/PlayersPage/PlayersPage";
import TeamsPage from "@/pages/TeamsPage/TeamsPage";
import MatchesSchedulePage from "@/pages/MatchesSchedulePage/MatchesSchedulePage";
import MatchesResultPage from "@/pages/MatchesResultPage/MatchesResultPage";
import SeasonStatisticPage from "@/pages/MatchStatisticPage/SeasonStatisticPage.tsx";
import TeamDetailsPage from "@/pages/TeamDetailsPage/TeamDetailsPage.tsx";

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
]);