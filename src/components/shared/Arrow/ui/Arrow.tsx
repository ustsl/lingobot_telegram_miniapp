import { baseColorType, baseSizeType } from '@/types/base';
import styles from './arrow.module.css'
import classNames from 'classnames';

export interface IArrow {
    direction?: 'right' | 'left';
    size?: baseSizeType;
    onClick?: any;
    rotate?: boolean;
    bold?: boolean;
    color?: baseColorType
}

export const Arrow = ({ direction, size, onClick, rotate, bold, color }: IArrow) => {
    const arrowClass = classNames(styles.arrow, {
        [styles.right]: direction === 'right',
        [styles.left]: direction === 'left',
        [styles[`size${size}`]]: true,
        [styles[`${color}Color`]]: true,
        [styles.rotate]: rotate,
        [styles.bold]: bold
    });

    return (
        <div className={arrowClass} onClick={onClick}>
            <div className={styles.stick}></div>
        </div>
    );
}
