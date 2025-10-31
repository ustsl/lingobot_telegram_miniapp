import styles from './iconMenuPoint.module.css';
import Link from "next/link";
import { IIconMenuButtonPoint, IIconMenuPoint } from "./iconMenuPoint.props";
import classNames from 'classnames';

export const IconMenuPoint = ({ link, text, icon, size, fontSize }: IIconMenuPoint) => {

    const linkClassName = classNames(styles.iconLink, {
        [styles[`size${size}`]]: size,
        [styles[`fontSize${fontSize}`]]: fontSize
    });


    return (
        <Link href={link} className={linkClassName}>
            {icon && <div className={styles.icon}>{icon}</div>}
            <span>{text}</span>
        </Link>
    );
}


export const IconMenuButtonPoint = ({ onClick, text, icon, size, fontSize }: IIconMenuButtonPoint) => {

    const linkClassName = classNames(styles.iconLink, {
        [styles[`size${size}`]]: size,
        [styles[`fontSize${fontSize}`]]: fontSize
    });


    return (
        <button onClick={onClick} className={linkClassName}>
            <div className={styles.icon}>{icon}</div>
            <span>{text}</span>
        </button>
    );
}