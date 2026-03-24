import type {Player} from "@/types/types.ts";
import styles from "./PlayerCard.module.css";
import { API_URL } from "@/config/api";

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
                       <a className={styles.team} href="#">{player.team.name}</a>
                    </div>
                )}
            </div>
        </div>
    );
};