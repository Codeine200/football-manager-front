import type {MatchResult} from "@/types/types.ts";
import styles from "./MatchResultItem.module.css";
import {Link} from "react-router-dom";
import {TeamsLogo} from "@/components/teams-logo/TeamsLogo.tsx";

type Props = {
    match: MatchResult;
};

export const MatchResultItem = ({ match }: Props) => {
    return (
        <div className={styles.item}>
            <TeamsLogo team1={match.team1} team2={match.team2}/>

            <div className={styles.result}>
                <div className={styles.teamName1}>
                    <Link to={`/teams/${match.team1.id}`}>{match.team1.name}</Link>
                    <div>{match.team1.goals}</div>
                </div>

                <div>
                    <div>vs</div>
                    <div>-</div>
                </div>

                <div className={styles.teamName2}>
                    <Link to={`/teams/${match.team2.id}`}>{match.team2.name}</Link>
                    <div>{match.team2.goals}</div>
                </div>
            </div>
        </div>
    );
};