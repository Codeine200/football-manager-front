import type {Player} from "@/types/types.ts";
import styles from "./PlayerCard.module.css";
import { API_URL } from "@/config/api";
import {Link} from "react-router-dom";

type Props = {
    player: Player;
};

export const PlayerCard = ({ player }: Props) => {
    return (
        <div className={styles.item}>
            <div className={styles.logo}>
                {player.photo && <img
                    src={`${API_URL}${player.photo}`}
                    alt={player.fullName}
                    className={styles.image}
                />
                }
            </div>

            <div>
                <div className={styles.name}>{player.fullName}</div>
                {player.team && (
                    <div>
                        <Link to={`/teams/${player.team.id}`}  className={styles.team}>
                            {player.team.name}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};