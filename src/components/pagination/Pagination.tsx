import styles from "./Pagination.module.css";

export type Pageable = {
    currPage: number;
    totalSizePage: number;
    onChange: (page: number) => void;
}

export const Pagination = ({currPage, totalSizePage, onChange}: Pageable) => {
  return (
      <div className={styles.pagination}>
          {currPage == 0 ? <div className={`${styles.prev} ${styles.inactive}`}>Prev</div>
                         : <button className={styles.prev} onClick={() => {onChange(currPage - 1);}}>Prev</button>
          }
          {currPage - 1 >= 0
              && <button className={styles.page} onClick={() => {onChange(currPage - 1);}}>{currPage}</button>
          }
          <button className={`${styles.page} ${styles.current}`}>{currPage + 1}</button>
          {currPage + 1 < totalSizePage
              && <button className={styles.page} onClick={() => {onChange(currPage + 1);}}>{currPage + 2}</button>
          }
          {currPage + 1 < totalSizePage
              ? <button className={styles.next} onClick={() => {onChange(currPage + 1);}}>Next</button>
              : <div className={`${styles.next} ${styles.inactive}`}>Next</div>
          }
      </div>
  )
}