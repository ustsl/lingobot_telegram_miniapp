import styles from './buttonMenuPoint.module.css'

import { IButtonMenuPoint } from './buttonMenuPoint.props';

import Link from "next/link";


export const ButtonMenuPoint = ({ link, text }: IButtonMenuPoint) => {

    return (
        <Link href={link} className={styles.button}>
            <span>{text}</span>
        </Link>
    );
}

