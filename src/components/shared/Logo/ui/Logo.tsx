import styles from './logo.module.css';

import logo from './logo.svg';
import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
    return (
        <Link href="/" className={styles.link}>
            <Image src={logo} width={100} height={25} alt="Logo Lingobot" />
        </Link>
    )
}