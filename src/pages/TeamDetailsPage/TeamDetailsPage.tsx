import {useEffect, useRef, useState} from "react";
import styles from "./SeasonStatisticPage.module.css";
import type {PageResponse, TeamDetails, TeamStatsBySeason} from "@/types/types.ts";
import {Pagination} from "@/components/pagination/Pagination";
import Preloader from "@/components/preloader/Preloader";
import fetchData from "@/api/api.ts"
import {API_SEASONS_PATH, API_TEAMS_PATH} from "@/config/api.ts";
import {SeasonStatistic} from "@/components/season-statistic/SeasonStatistic.tsx";
import {useParams} from "react-router-dom";


const TeamDetailsPage = () => {
    const { id } = useParams();
    const [team, setTeam] = useState<TeamDetails[]>();
    const [loading, setLoading] = useState(false);
    const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!id) return;

        timerId.current && clearTimeout(timerId.current);
        const idParam = id;

        timerId.current = window.setTimeout(() => {

            const params: Record<string, string> = {
                id: idParam,
            };

            fetchData(API_TEAMS_PATH, {
                params: params,
                onSuccess: (data: PageResponse<TeamDetails>) => {
                    setTeam(data.items);
                },
                loading: (loading: boolean) => {
                    setLoading(loading);
                }
            });
        }, 200);

        return () => {
            timerId.current && clearTimeout(timerId.current);
        }

    }, [id]);

    return (
        <>
            {loading ? (
                <Preloader />
            ) : (
                <div className={styles.season}>
                    {seasons.map(seasonMap=>
                        Object.entries(seasonMap).map(([season, teams]) => (
                            <SeasonStatistic
                                key={season}
                                season={Number(season)}
                                teams={teams}
                            />
                        ))
                    )}
                </div>
            )}
            <Pagination currPage={currPage} totalSizePage={totalPages} onChange={(page) => setCurrPage(page)}/>

        </>
    );
};

export default TeamDetailsPage;