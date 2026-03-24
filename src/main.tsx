import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import "./style.css";
import "./assets/normalize.css";

ReactDOM.createRoot(document.getElementById("app")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);