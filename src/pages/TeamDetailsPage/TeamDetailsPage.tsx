import {useEffect, useRef, useState} from "react";
import styles from "./TeamDetailsPage.module.css";
import type {TeamDetails} from "@/types/types.ts";
import Preloader from "@/components/preloader/Preloader";
import {fetchOne} from "@/api/api.ts"
import {API_TEAMS_PATH, API_URL} from "@/config/api.ts";
import {useParams} from "react-router-dom";


const TeamDetailsPage = () => {
    const { id } = useParams();
    const [team, setTeam] = useState<TeamDetails | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        fetchOne(API_TEAMS_PATH + '/' + id, {
            onSuccess: (data: TeamDetails) => {
                setTeam(data);
            },
            loading: (loading: boolean) => {
                setLoading(loading);
            }
        });
    }, [id]);

    return (
        <>
            {loading ? (
                <Preloader />
            ) : (
                <>
                    <div className={styles.team}>
                        <div className={styles.background}>
                            {team?.imageUrl && <img
                                src={`${API_URL}${team.imageUrl}`}
                                alt={team.name}
                                className={styles.img}
                            />
                            }
                        </div>
                        <h1 className={styles.title}>{team?.name}</h1>
                    </div>

                    {team?.players.map((player) =>
                    <div className={styles.players}>
                        <div className={styles.item}>
                            <div className={styles.logo}>
                                {player?.photo && <img
                                    src={`${API_URL}${player.photo}`}
                                    alt={player.fullName}
                                    className={styles.img}
                                />
                                }
                            </div>
                            <div className={styles.playersName}>
                                {player.fullName}
                            </div>
                        </div>
                    </div>
                    )
                    }
                </>
            )}
        </>
    );
};

export default TeamDetailsPage;