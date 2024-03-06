import styles from './buttonComponent.module.css';
import classNames from 'classnames';

interface IButton {
    text: string;
    onClick: () => void;
    color?: 'success';
}

export const ButtonComponent = ({ text, color, onClick }: IButton) => {
    const buttonClasses = classNames(styles.button, {
        [styles[`${color}Style`]]: color,
    });

    return (
        <button onClick={onClick} className={buttonClasses}>{text}</button>
    );
}
