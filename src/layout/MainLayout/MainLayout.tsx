import { Outlet, NavLink } from "react-router-dom";
import { getLinkClass } from "@/helper/helpers";
import styles from "./MainLayout.module.css";

const MainLayout = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Outlet />
            </div>

            <nav className={styles.menu}>
                <NavLink
                    to="/schedule"
                    className={getLinkClass("calendar")}
                />

                <NavLink
                    to="/matches"
                    className={getLinkClass("trophy")}
                />

                <NavLink
                    to="/seasons"
                    className={getLinkClass("chart")}
                />

                <NavLink
                    to="/teams"
                    className={getLinkClass("users")}
                />

                <NavLink
                    to="/players"
                    className={getLinkClass("user")}
                />
            </nav>
        </div>
    );
};

export default MainLayout;