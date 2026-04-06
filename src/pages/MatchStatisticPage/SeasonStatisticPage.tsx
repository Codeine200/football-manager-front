import {useEffect, useRef, useState} from "react";
import styles from "./SeasonStatisticPage.module.css";
import type {PageResponse, TeamStatsBySeason} from "@/types/types.ts";
import {Pagination} from "@/components/pagination/Pagination";
import Preloader from "@/components/preloader/Preloader";
import {fetchData} from "@/api/api.ts"
import {API_SEASONS_PATH} from "@/config/api.ts";
import {SeasonStatistic} from "@/components/season-statistic/SeasonStatistic.tsx";

const pageSize = 2;

const SeasonStatisticPage = () => {
    const [seasons, setSeasons] = useState<TeamStatsBySeason[]>([]);
    const [currPage, setCurrPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        timerId.current && clearTimeout(timerId.current);

        timerId.current = window.setTimeout(() => {
            const params: Record<string, string> = {
                page: currPage.toString(),
                size: pageSize.toString()
            };

            fetchData(API_SEASONS_PATH, {
                params: params,
                onSuccess: (data: PageResponse<TeamStatsBySeason>) => {
                    setSeasons(data.items);
                    setTotalPages(data.totalPages);
                },
                loading: (loading: boolean) => {
                    setLoading(loading);
                }
            });
        }, 200);

        return () => {
            timerId.current && clearTimeout(timerId.current);
        }

    }, [currPage]);

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

export default SeasonStatisticPage;