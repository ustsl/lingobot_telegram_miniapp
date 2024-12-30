
import { RegularButtonComponent } from '@/components/shared/RegularButtonComponent';
import styles from './pagination.module.css'


export const Pagination = ({ page, setPage, nextPage }:
    { nextPage: boolean, page: number, setPage: (data: number) => void }) => {

    function handlePagination(change: 'next' | 'prev') {
        switch (change) {
            case "next":
                setPage(page + 1)
                break;
            case "prev":
                setPage(page - 1)
                break;
            default:
                console.log("Error");
        }
    }

    return (
        <div className={styles.pagination}>
            {page > 1 ? <RegularButtonComponent text={"Назад"} onClick={() => handlePagination("prev")} /> : <div></div>}
            {nextPage && <RegularButtonComponent text={"Дальше"} onClick={() => handlePagination("next")} />}
        </div>
    )
}