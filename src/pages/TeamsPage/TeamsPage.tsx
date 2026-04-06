import {useEffect, useRef, useState} from "react";
import styles from "./TeamsPage.module.css";
import type {PageResponse, Team} from "@/types/types.ts";
import {Pagination} from "@/components/pagination/Pagination";
import {SearchInput} from "@/components/search-input/SearchInput"
import Preloader from "@/components/preloader/Preloader";
import {fetchData} from "@/api/api.ts"
import {API_TEAMS_PATH} from "@/config/api.ts";
import {TeamCard} from "@/components/team-card/TeamCard";

const pageSize = 7;

const TeamsPage = () => {
    const [search, setSearch] = useState<string>('');
    const [teams, setTeams] = useState<Team[]>([]);
    const [currPage, setCurrPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const timerId = useRef<number | undefined>(undefined);

    useEffect(() => {
        if (timerId.current !== undefined) {
            clearTimeout(timerId.current);
        }

        timerId.current = window.setTimeout(() => {
            const params: Record<string, string> = {
                page: currPage.toString(),
                size: pageSize.toString(),
            };

            if (search) {
                params["search"] = search;
            }

            fetchData(API_TEAMS_PATH, {
                params: params,
                onSuccess: (data: PageResponse<Team>) => {
                    setTeams(data.items);
                    setTotalPages(data.totalPages);
                },
                loading: (loading: boolean) => {
                    setLoading(loading);
                }
            });
        }, 200);

        return () => {
            if (timerId.current !== undefined) {
                clearTimeout(timerId.current);
            }
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
                :  <div className={styles.teams}>
                    {teams.map((team) => (
                        <TeamCard team={team} key={team.id} />
                    ))}
                </div>

            }
            <Pagination currPage={currPage} totalSizePage={totalPages} onChange={(page) => setCurrPage(page)} />

        </>
    );
};

export default TeamsPage;