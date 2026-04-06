import {useEffect, useRef, useState} from "react";
import styles from "./MatchesResultPage.module.css";
import type {MatchResult, PageResponse} from "@/types/types.ts";
import {Pagination} from "@/components/pagination/Pagination";
import {SearchInput} from "@/components/search-input/SearchInput"
import Preloader from "@/components/preloader/Preloader";
import {fetchData} from "@/api/api.ts"
import {API_MATCHES_PATH} from "@/config/api.ts";
import {MatchResultItem} from "@/components/match-result/MatchResultItem";

const pageSize = 7;

const MatchesResultPage = () => {
    const [search, setSearch] = useState<string>('');
    const [matches, setMatches] = useState<MatchResult[]>([]);
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
                isFinished: "true"
            };

            if (search) {
                params["search"] = search;
            }

            fetchData(API_MATCHES_PATH, {
                params: params,
                onSuccess: (data: PageResponse<MatchResult>) => {
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
                        <MatchResultItem match={match} key={match.id} />
                    ))}
                </div>

            }
            <Pagination currPage={currPage} totalSizePage={totalPages} onChange={(page) => setCurrPage(page)} />

        </>
    );
};

export default MatchesResultPage;