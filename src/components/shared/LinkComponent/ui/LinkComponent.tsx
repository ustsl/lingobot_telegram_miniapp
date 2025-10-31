import styles from './LinkComponent.module.css'
import Link from "next/link"
import classNames from 'classnames'

export const LinkComponent = ({
    href,
    text,
    newPage,
    size = 'M'
}: {
    href: string
    text: string
    newPage?: boolean
    size?: 'S' | 'M'
}) => {
    const cl = classNames(styles.link, {
        [styles.sizeS]: size === 'S',
        [styles.sizeM]: size === 'M',
    });

    return (
        <Link
            href={href}
            className={cl}
            target={newPage ? "_blank" : undefined}
            rel={newPage ? "noopener noreferrer" : undefined}
        >
            {text}
        </Link>
    )
}
