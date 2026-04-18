import styles from "./AdminFormTeamPage.module.css";
import {useEffect, useState} from "react";
import {api, fetchOne} from "@/api/api";
import {Link, useParams} from "react-router-dom";
import {API_TEAMS_PATH, API_URL} from "@/config/api.ts";
import type {TeamDetails} from "@/types/types.ts";
import Preloader from "@/components/preloader/Preloader.tsx";
import backIcon from "@/assets/images/back.svg";
import {ImageUpload} from "@/components/image-upload/ImageUpload.tsx";

const AdminFormTeamPage = () => {
    const { id} = useParams();
    const [loading, setLoading] = useState(false);
    const [teamName, setTeamName] = useState("");
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const isEdit = id != null;

    useEffect(() => {
        document.title = (!id) ? "Add team" : "Edit team";
    }, [id]);

    useEffect(() => {
        if (!id) return;
        fetchOne(API_TEAMS_PATH + '/' + id, {
            onSuccess: (data: TeamDetails) => {
                setTeamName(data.name);
                setImageUrl(data.imageUrl);
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
                    <div>
                        <div className={styles.header}>
                            <Link to={`/admin/teams`}>
                                <img src={backIcon} alt="Back to teams "/>
                            </Link>
                            <h2>{isEdit ? "Edit team" : "Add team"}</h2>
                        </div>
                        <div className={styles.team}>
                            <div className={styles.imageWrapper}>
                            {imageUrl &&
                                    <div className={styles.background}>
                                        <div className={styles.imageContainer}>
                                            <img
                                                src={`${API_URL}${imageUrl}`}
                                                alt={teamName}
                                                className={styles.img}
                                            />
                                            <button title="Remove team logo"
                                                    className={`${styles.removeImage} ${styles.actionButton}`}></button>
                                        </div>
                                    </div>
                                }
                            </div>

                            <div className={styles.field}>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="Team name"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                />
                            </div>
                            <ImageUpload onChange={(file) => setFile(file)}/>
                        </div>
                        <button
                            type="submit"
                            className={`${styles.button} ${styles.saveButton}`}
                        >
                            Save
                        </button>
                    </div>
                </>
            )}
        </>
    );
};

export default AdminFormTeamPage;