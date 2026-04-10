import { Outlet, NavLink, Navigate } from "react-router-dom";
import { getLinkClass } from "@/helper/helpers";
import { useAuth } from "@/hooks/useAuth";
import Preloader from "@/components/preloader/Preloader";
import styles from "./AdminLayout.module.css";

const AdminLayout = () => {
    const { isAuth, loading } = useAuth();

    if (loading) {
        return <Preloader />;
    }

    if (!isAuth) {
        return <Navigate to="/admin/login" replace />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Outlet />
            </div>
            <nav className={styles.menu}>
                <NavLink
                    to="/admin/matches"
                    className={getLinkClass("trophy")}
                />

                <NavLink
                    to="/admin/teams"
                    className={getLinkClass("users")}
                />

                <NavLink
                    to="/admin/players"
                    className={getLinkClass("user")}
                />
            </nav>
        </div>
    );
};

export default AdminLayout;