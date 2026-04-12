import styles from "./AdminPlayersPage.module.css";
import {useEffect} from "react";

const PAGE_TITLE = "Players";

const AdminPlayersPage = () => {

    useEffect(() => {
        document.title = PAGE_TITLE;
    }, []);

    return (
        <>AdminPlayersPage</>
    );
};

export default AdminPlayersPage;