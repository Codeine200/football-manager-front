import { useState } from "react";
import styles from "./LoginPage.module.css";
import {api, setAccessToken } from "@/api/api.ts";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/login", {
                username: email,
                password: password,
            });

            setAccessToken(res.data.accessToken);

            navigate("/admin/matches");
        } catch (err) {
            console.error("Login failed", err);
        }
    };

    return (
        <div className={styles.login}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.line}></div>

                <div className={styles.title}>Welcome</div>

                <div className={styles.field}>
                    <img
                        className={styles.icon}
                        src="/images/message.svg"
                        alt="email"
                    />
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className={`${styles.field} ${styles.fieldPassword}`}>
                    <img
                        className={styles.icon}
                        src="/images/password.svg"
                        alt="password"
                    />
                    <input
                        className={styles.input}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className={`${styles.button} ${styles.loginButton}`}
                >
                    Sign in
                </button>
            </form>
        </div>
    );
};

export default LoginPage;