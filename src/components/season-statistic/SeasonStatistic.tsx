import type {TeamTournamentStats} from "@/types/types.ts";
import styles from "./SeasonStatistic.module.css";
import {API_URL} from "@/config/api.ts";
import {Link} from "react-router-dom";

type Props = {
    season: number;
    teams: TeamTournamentStats[];
};

export const SeasonStatistic = ({ season, teams }: Props) => {
    return (
        <>
            <div className={styles.title}>{season}</div>
            <div className={styles.resultList}>
                <div className={styles.titleName}>
                    <div className={styles.columnTeam}>Team</div>
                    <div className={styles.columnResult}>D</div>
                    <div className={styles.columnResult}>L</div>
                    <div className={styles.columnResult}>Ga</div>
                    <div className={styles.columnResult}>Gd</div>
                    <div className={styles.columnResult}>Pts</div>
                </div>

                {teams.map((team) => (
                    <div className={styles.titleName} key={team.team.id}>
                        <div className={styles.columnTeam}>
                            <img
                                className={styles.image}
                                src={`${API_URL}${team.team.imageUrl}`}
                                alt={team.team.name}
                            />
                            <div><Link to={`/teams/${team.team.id}`}>{team.team.name}</Link></div>
                        </div>
                        <div className={styles.columnResult}>{team.draws}</div>
                        <div className={styles.columnResult}>{team.losses}</div>
                        <div className={styles.columnResult}>{team.goalsAgainst}</div>
                        <div className={styles.columnResult}>{team.goalDifference}</div>
                        <div className={styles.columnResult}>{team.points}</div>
                    </div>
                ))}
            </div>
        </>
    );
};