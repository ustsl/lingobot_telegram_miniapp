import { baseSizeType } from '@/app/globals.types';
import styles from './buttonComponent.module.css';
import classNames from 'classnames';

interface IButton {
    text: string;
    onClick: () => void;
    color?: 'success';
    size?: baseSizeType
}

export const ButtonComponent = ({ text, color, size, onClick }: IButton) => {
    const buttonClasses = classNames(styles.button, {
        [styles[`${color}Style`]]: color,
        [styles[`size${size}`]]: size,
    });

    return (
        <button onClick={onClick} className={buttonClasses}>{text}</button>
    );
}
