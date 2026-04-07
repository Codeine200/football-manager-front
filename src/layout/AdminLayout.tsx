import {Outlet, NavLink, Navigate} from "react-router-dom";
import {getLinkClass} from "@/helper/helpers.ts";

const MainLayout = () => {
    const isAuth = !!localStorage.getItem("accessToken");

    if (!isAuth) {
        return <Navigate to="/admin/login" replace />;
    }

    return (
        <div className="container">
            <div className="content">
                <Outlet />
            </div>
            <nav className="menu">
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

export default MainLayout;