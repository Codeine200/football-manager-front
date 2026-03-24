import styles from "./Preloader.module.css";
import PreloaderImg from "@/assets/images/preloader.svg";

const Preloader = () => {
    return (
        <div className={styles.preloader}>
            <img src={PreloaderImg} alt="Preloader" width={38} height={38} />
        </div>
    );
};

export default Preloader;