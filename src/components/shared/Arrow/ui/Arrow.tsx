import { baseSizes } from '@/types/baseTypes';
import styles from './arrow.module.css'
import classNames from 'classnames';

export interface IArrow {
    direction?: 'right' | 'left';
    size?: baseSizes
    onClick?: any;
    rotate?: boolean;
    bold?: boolean;

}

export const Arrow = ({ direction, size, onClick, rotate, bold, }: IArrow) => {
    const arrowClass = classNames(styles.arrow, {
        [styles.right]: direction === 'right',
        [styles.left]: direction === 'left',
        [styles[`size${size}`]]: true,
        [styles.rotate]: rotate,
        [styles.bold]: bold
    });

    return (
        <div className={arrowClass} onClick={onClick}>
            <div className={styles.stick}></div>
        </div>
    );
}
