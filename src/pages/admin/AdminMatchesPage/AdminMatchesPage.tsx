import styles from "./AdminMatchesPage.module.css";
import {useEffect} from "react";
import {api} from "@/api/api";

const PAGE_TITLE = "Matches";

const AdminMatchesPage = () => {

    useEffect(() => {


    }, []);

    useEffect(() => {
        document.title = PAGE_TITLE;
    }, []);

    return (
       <>AdminMatchesPage</>
    );
};

export default AdminMatchesPage;