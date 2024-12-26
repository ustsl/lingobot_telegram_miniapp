
import { MinusIcon } from '@/icons/ui/base/minus'
import styles from './itemsBlock.module.css'
import { ISentenceListItem } from './itemsBlock.props'


export const ItemsBlock = ({ results, onDelete }: { results: ISentenceListItem[], onDelete: (data: number) => void }) => {
    return (
        <div className={styles.items}>
            {results && results.length > 0 && results.map((item: ISentenceListItem, index: number) => {
                return (
                    <div key={item.id} className={styles.flex}>
                        <div className={styles.item}>
                            <span className={styles.sentence}>{item.sentence_text}</span>
                            <span className={styles.translate}>{item.ru_translation}</span>
                            {/* <span className={styles.stat}>Уровень знания: {item.repeat_number}</span> */}
                        </div>
                        <div className={styles.delete} onClick={() => onDelete(item.id)}>
                            <MinusIcon />
                        </div>
                    </div>)
            })}</div>
    )
}