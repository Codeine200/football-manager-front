import {Outlet, NavLink, Navigate} from "react-router-dom";
import {getLinkClass} from "@/helper/helpers.ts";
import {useAuth} from "@/hooks/useAuth.ts";
import Preloader from "@/components/preloader/Preloader.tsx";

const MainLayout = () => {
    const { isAuth, loading } = useAuth();

    if (loading) {
        return  <Preloader />;
    }

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