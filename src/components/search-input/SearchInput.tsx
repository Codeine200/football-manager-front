import styles from "./SearchInput.module.css";
import searchIcon from "@/assets/images/search.svg";

type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
    onClear?: () => void;
    placeholder?: string;
};

export const SearchInput = (props: SearchInputProps) => {
    const {
        value,
        onChange,
        onClear,
        placeholder = "Search...",
    } = props;

    return (
        <div className={styles.form}>
            <div className={styles.field}>
                <img
                    className={styles.icon}
                    src={searchIcon}
                    alt="search"
                />
                <input
                    className={styles.input}
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>

            <button
                className={styles.cancel}
                type="button"
                onClick={() => {
                    onChange("");
                    onClear?.();
                }}
            >
                Cancel
            </button>
        </div>
    );
};