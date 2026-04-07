import styles from "./LoginPage.module.css";

const LoginPage = () => {
    return (
        <div className={styles.login}>
            <div className={styles.form}>
                <div className={styles.line}></div>

                <div className={styles.title}>Welcome</div>

                <div className={`${styles.field}`}>
                    <img
                        className={styles.icon}
                        src="/images/message.svg"
                        alt="email"
                    />
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Email"
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
                    />
                </div>

                <button className={`${styles.button} ${styles.loginButton}`}>
                    Sign in
                </button>
            </div>
        </div>
    );
};

export default LoginPage;