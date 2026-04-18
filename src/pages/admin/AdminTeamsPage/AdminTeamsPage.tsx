import {useEffect, useRef, useState} from "react";
import styles from "./AdminTeamsPage.module.css";
import type {PageResponse, Team} from "@/types/types";
import {Pagination} from "@/components/pagination/Pagination";
import {SearchInput} from "@/components/search-input/SearchInput"
import Preloader from "@/components/preloader/Preloader";
import {fetchData} from "@/api/api"
import {API_TEAMS_PATH} from "@/config/api";
import {AdminTeamCard} from "@/components/admin/team-card/AdminTeamCard";
import {Link} from "react-router-dom";

const pageSize = 7;
const PAGE_TITLE = "Teams";

const AdminTeamsPage = () => {
    const [search, setSearch] = useState<string | null>(null);
    const [teams, setTeams] = useState<Team[]>([]);
    const [currPage, setCurrPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const timerId = useRef<number | undefined>(undefined);

    const fetchTeams = () => {
        const params: Record<string, string> = {
            page: currPage.toString(),
            size: pageSize.toString(),
        };

        if (search) {
            params.search = search;
        }

        fetchData(API_TEAMS_PATH, {
            params,
            onSuccess: (data: PageResponse<Team>) => {
                setTeams(data.items);
                setTotalPages(data.totalPages);
            },
            loading: setLoading,
        });
    };

    useEffect(() => {
        if (search == null) {
            return;
        }

        if (timerId.current !== undefined) {
            clearTimeout(timerId.current);
        }

        setLoading(true);

        timerId.current = window.setTimeout(() => {
            fetchTeams();
        }, 300);

        return () => {
            if (timerId.current !== undefined) {
                clearTimeout(timerId.current);
            }
        }
    }, [search]);

    useEffect(() => {
        fetchTeams();
    }, [currPage]);

    useEffect(() => {
        document.title = PAGE_TITLE;
    }, []);

    return (
        <>
            <div className={styles.action}>
                <SearchInput
                    value={search}
                    onChange={setSearch}
                    placeholder="Search your team"
                />
                <Link to={`/admin/teams/new`} title="Add team" className={`${styles.create} ${styles.actionButton}`}></Link>
            </div>
            {loading
                ? <Preloader/>
                :  <div className={styles.teams}>
                    {teams.map((team) => (
                        <AdminTeamCard team={team} key={team.id} />
                    ))}
                </div>

            }
            <Pagination currPage={currPage} totalSizePage={totalPages} onChange={(page) => setCurrPage(page)} />

        </>
    );
};

export default AdminTeamsPage;