import styles from "./AdminFormTeamPage.module.css";
import {useEffect, useState} from "react";
import {api, fetchOne} from "@/api/api";
import {Link, useParams} from "react-router-dom";
import {API_TEAMS_PATH, API_URL} from "@/config/api.ts";
import type {TeamDetails} from "@/types/types.ts";
import Preloader from "@/components/preloader/Preloader.tsx";
import backIcon from "@/assets/images/back.svg";

const AdminFormTeamPage = () => {
    const { id} = useParams();
    const [team, setTeam] = useState<TeamDetails | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = (!id) ? "Add team" : "Edit team";
    }, [id]);

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
                        <Link to={`/admin/teams`}>
                            <img src={backIcon} alt="Back to teams "/>
                        </Link>
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
                </>
            )}
        </>
    );
};

export default AdminFormTeamPage;