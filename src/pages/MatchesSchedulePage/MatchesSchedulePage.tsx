import {useEffect, useRef, useState} from "react";
import styles from "./MatchesSchedulePage.module.css";
import type {MatchInfo, PageResponse} from "@/types/types.ts";
import {Pagination} from "@/components/pagination/Pagination";
import {SearchInput} from "@/components/search-input/SearchInput"
import Preloader from "@/components/preloader/Preloader";
import fetchData from "@/api/api.ts"
import {API_MATCHES_PATH} from "@/config/api.ts";
import {MatchScheduleItem} from "@/components/match-schedule/MatchScheduleItem";

const pageSize = 7;

const MatchesSchedulePage = () => {
    const [search, setSearch] = useState<string>('');
    const [matches, setMatches] = useState<MatchInfo[]>([]);
    const [currPage, setCurrPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        timerId.current && clearTimeout(timerId.current);

        timerId.current = window.setTimeout(() => {
            const params: Record<string, string> = {
                page: currPage.toString(),
                size: pageSize.toString(),
                isFinished: "false"
            };

            if (search) {
                params["search"] = search;
            }

            fetchData(API_MATCHES_PATH, {
                params: params,
                onSuccess: (data: PageResponse<MatchInfo>) => {
                    setMatches(data.items);
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

    }, [currPage, search]);

    return (
        <>
            <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search your team"
            />
            {loading
                ? <Preloader />
                :  <div className={styles.matches}>
                    {matches.map((match) => (
                        <MatchScheduleItem match={match} key={match.id} />
                    ))}
                </div>

            }
            <Pagination currPage={currPage} totalSizePage={totalPages} onChange={(page) => setCurrPage(page)} />

        </>
    );
};

export default MatchesSchedulePage;