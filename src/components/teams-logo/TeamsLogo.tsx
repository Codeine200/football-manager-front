import type {Team} from "@/types/types.ts";
import {Link} from "react-router-dom";
import {API_URL} from "@/config/api.ts";
import styles from "./TeamsLogo.module.css";

type TeamProps = {
    team1: Team;
    team2: Team;
}

export const TeamsLogo = (props: TeamProps) => {
    const {team1, team2} = props;
    return (
        <div className={styles.teams}>
            <Link className={`${styles.team1} ${styles.logo}`} to={`/teams/${team1.id}`}>
                {team1.imageUrl ? (
                    <img
                        src={`${API_URL}${team1.imageUrl}`}
                        alt={team1.imageUrl}
                        className={styles.img}
                    />
                ) : null as React.ReactNode}
            </Link>

            <Link className={`${styles.team2} ${styles.logo}`} to={`/teams/${team2.id}`}>
                {team2.imageUrl ? (
                    <img
                        src={`${API_URL}${team2.imageUrl}`}
                        alt={team2.imageUrl}
                        className={styles.img}
                    />
                ) : null as React.ReactNode}
            </Link>
        </div>
    );
}