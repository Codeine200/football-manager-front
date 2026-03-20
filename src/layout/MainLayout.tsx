import { Outlet, NavLink } from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="container">
            <div className="content">
                <Outlet />
            </div>
            <nav className="menu">
                <NavLink
                    to="/schedule"
                    className={({ isActive }) =>
                        `menu__item calendar ${isActive ? "menu__item--current" : ""}`
                    }
                />

                <NavLink
                    to="/matches"
                    className={({ isActive }) =>
                        `menu__item trophy ${isActive ? "menu__item--current" : ""}`
                    }
                />

                <NavLink
                    to="/seasons"
                    className={({ isActive }) =>
                        `menu__item chart ${isActive ? "menu__item--current" : ""}`
                    }
                />

                <NavLink
                    to="/teams"
                    className={({ isActive }) =>
                        `menu__item users ${isActive ? "menu__item--current" : ""}`
                    }
                />

                <NavLink
                    to="/players"
                    className={({ isActive }) =>
                        `menu__item user ${isActive ? "menu__item--current" : ""}`
                    }
                />
            </nav>
        </div>
    );
};

export default MainLayout;