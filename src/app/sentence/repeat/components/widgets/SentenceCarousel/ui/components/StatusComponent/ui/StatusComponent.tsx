import confetti from './conf.gif';
import Link from 'next/link';
import Image from 'next/image';
import styles from './successComponent.module.css';

export const SuccessComponent = () => {
    return (
        <div className={styles.block}>
            <Image src={confetti} width={150} height={150} alt="conf" />
            <div className={styles.text}>Тренировка завершена</div>
            <Link href="/" className={styles.link}>Вернуться в меню</Link>
        </div>
    )
}


export const ErrorComponent = ({ text }: { text: string }) => {
    return (
        <div className={styles.block}>

            <div className={styles.text}>Тренировка не может начаться</div>
            <p>{text}</p>
            <Link href="/" className={styles.link}>Вернуться в меню</Link>
        </div>
    )
}