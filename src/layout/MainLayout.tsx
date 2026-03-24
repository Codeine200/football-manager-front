import { Outlet, NavLink } from "react-router-dom";
import {getLinkClass} from "@/helper/helpers.ts";

const MainLayout = () => {
    return (
        <div className="container">
            <div className="content">
                <Outlet />
            </div>
            <nav className="menu">
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