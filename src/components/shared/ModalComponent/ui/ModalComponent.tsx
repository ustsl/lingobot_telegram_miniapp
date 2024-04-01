import styles from './modalComponent.module.css';
import classNames from 'classnames';
import { usePathname, useRouter } from 'next/navigation';
import React, { useRef, useEffect, useState } from 'react';

interface IModalComponentProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    width?: string;
}

export const ModalComponent = ({ isOpen, onClose, children, width }: IModalComponentProps) => {

    const path = usePathname();

    const [currentPath, setPath] = useState(path)


    const modalRef = useRef<HTMLDivElement | null>(null);

    const modalWindowClass = classNames(styles.modalWindow, {
        [styles.width100]: width === '100%'
    });

    useEffect(() => {

        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen, onClose]);

    useEffect(() => {
        if (path !== currentPath) {
            onClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.overlay}>
            <div ref={modalRef} className={modalWindowClass}>
                <div className={styles.modalBody}>
                    {children}
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>
            </div>
        </div>
    );
};
