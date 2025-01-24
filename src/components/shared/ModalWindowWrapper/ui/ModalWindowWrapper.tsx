"use client";

import styles from './modalWindowWrapper.module.css';
import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import { useModalWrapper } from './modalWindowWrapper.store';
import { usePathname } from 'next/navigation';

export const ModalWindowWrapper = () => {
    const { setIsOpenModal, contentModal, isOpenModal, modalStyle } = useModalWrapper();
    const modalBodyRef = useRef<HTMLDivElement | null>(null);

    const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setIsOpenModal(false);
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (modalBodyRef.current && !modalBodyRef.current.contains(event.target as Node)) {
            setIsOpenModal(false);
        }
    };

    const modalWindowClass = classNames(
        styles.modalWindow,
        modalStyle === 'clear' && styles.clearModal
    );

    const pathname = usePathname()


    useEffect(() => {
        setIsOpenModal(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])


    useEffect(() => {
        if (isOpenModal) {
            // Убираем скролл
            document.body.style.overflow = 'hidden';
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscapeKey);
        } else {
            // Возвращаем скролл
            document.body.style.overflow = '';
        }

        return () => {
            // Восстанавливаем скролл и удаляем обработчики при размонтировании
            document.body.style.overflow = '';
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpenModal]);

    if (!isOpenModal) {
        return null;
    }

    return (
        <div className={styles.overlay}>
            <div className={modalWindowClass} ref={modalBodyRef}>
                <button className={styles.closeButton} onClick={() => setIsOpenModal(false)}>×</button>
                <div className={styles.data}>
                    {contentModal}
                </div>
            </div>
        </div>
    );
};
