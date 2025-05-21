import Link from 'next/link';
import styles from './successComponent.module.css';

export const SuccessComponent = ({ title, description }: { title: string; description: string }) => {
    return (
        <div className={styles.block}>
            {/* Анимация конфетти */}
            <div className={styles.confettiContainer}>
                {Array.from({ length: 50 }).map((_, i) => {
                    const x = Math.random() * 100;            // позиция по горизонтали
                    const rot = Math.random() * 360;          // начальный угол
                    const dur = 2 + Math.random() * 3;        // длительность падения от 2 до 5 секунд
                    const delay = Math.random() * dur;        // задержка перед первым падением
                    return (
                        <span
                            key={i}
                            className={styles.confettiPiece}
                            style={{
                                '--x': `${x}%`,
                                '--rot': `${rot}deg`,
                                '--dur': `${dur}s`,
                                '--delay': `${delay}s`,
                            } as React.CSSProperties}
                        />
                    );
                })}
            </div>

            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>

            <Link href="/" className={styles.link}>
                Вернуться в меню
            </Link>
        </div>
    );
};

export const ErrorComponent = ({ text }: { text: string }) => {
    return (
        <div className={styles.block}>
            <h3 className={styles.title}>Тренировка не может начаться</h3>
            <p>{text}</p>
            <Link href="/" className={styles.link}>Вернуться в меню</Link>
        </div >
    )
}