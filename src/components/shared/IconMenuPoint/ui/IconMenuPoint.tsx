import styles from './iconMenuPoint.module.css';
import Link from "next/link";
import { IIconMenuPoint } from "./iconMenuPoint.props";
import classNames from 'classnames';

export const IconMenuPoint = ({ link, text, icon, iconColor, size, fontSize }: IIconMenuPoint) => {

    const linkClassName = classNames(styles.iconLink, {
        [styles[`size${size}`]]: size,
        [styles[`fontSize${fontSize}`]]: fontSize
    });



    const iconClassName = classNames(styles.icon, {
        [styles[`${iconColor}IconColor`]]: iconColor,
    });

    return (
        <Link href={link} className={linkClassName}>
            <div className={iconClassName}>{icon}</div>
            <span>{text}</span>
        </Link>
    );
}
