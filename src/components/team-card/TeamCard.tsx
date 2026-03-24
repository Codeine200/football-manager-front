import type {Team} from "@/types/types.ts";
import styles from "./TeamCard.module.css";
import { API_URL } from "@/config/api";
import {Link} from "react-router-dom";

type Props = {
    team: Team;
};

export const TeamCard = ({ team }: Props) => {
    const {
        id,
        name,
        imageUrl,
    } = team;

    return (
        <div className={styles.item}>
            <div className={styles.logo}>
                {imageUrl && <img
                    src={`${API_URL}${imageUrl}`}
                    alt={name}
                    className={styles.image}
                />
                }
            </div>
            <div className={styles.name}>
                <Link to={`/teams/${id}`}  className={styles.link}>
                    {name}
                </Link>
            </div>
        </div>
    );
};