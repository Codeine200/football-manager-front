import type {MatchInfo} from "@/types/types.ts";
import styles from "./MatchScheduleItem.module.css";
import {Link} from "react-router-dom";
import {format, parseISO} from 'date-fns';
import {TeamsLogo} from "@/components/teams-logo/TeamsLogo.tsx";

type Props = {
    match: MatchInfo;
};

export const MatchScheduleItem = ({ match }: Props) => {
    return (
        <div className={styles.item}>
            <TeamsLogo team1={match.team1} team2={match.team2}/>

            <div className={styles.title}>
                <div className={styles.name}>
                    <Link to={`/teams/${match.team1.id}`}>{match.team1.name}</Link> VS{' '}
                    <Link to={`/teams/${match.team2.id}`}>{match.team2.name}</Link>
                </div>

                <div className={styles.date}>
                    {format(parseISO(match.matchDateTime), "EEEE, d MMM yyyy . hh.mm a")}
                </div>
            </div>
        </div>
    );
};