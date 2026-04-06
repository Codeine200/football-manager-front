import {useEffect, useRef, useState} from "react";
import {PlayerCard} from "@/components/player-card/PlayerCard";
import styles from "./PlayersPage.module.css";
import type {PageResponse, Player} from "@/types/types.ts";
import {Pagination} from "@/components/pagination/Pagination";
import {SearchInput} from "@/components/search-input/SearchInput"
import Preloader from "@/components/preloader/Preloader";
import {fetchData} from "@/api/api.ts"
import {API_PLAYERS_PATH} from "@/config/api.ts";

const pageSize = 7;

const PlayersPage = () => {
    const [search, setSearch] = useState<string>('');
    const [players, setPlayers] = useState<Player[]>([]);
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
            };

            if (search) {
                params["search"] = search;
            }

            fetchData(API_PLAYERS_PATH, {
                params: params,
                onSuccess: (data: PageResponse<Player>) => {
                    setPlayers(data.items);
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
                placeholder="Search your player"
            />
            {loading
                ? <Preloader />
                :  <div className={styles.players}>
                        {players.map((player) => (
                            <PlayerCard player={player} key={player.id} />
                        ))}
                   </div>

            }
            <Pagination currPage={currPage} totalSizePage={totalPages} onChange={(page) => setCurrPage(page)} />

        </>
    );
};

export default PlayersPage;