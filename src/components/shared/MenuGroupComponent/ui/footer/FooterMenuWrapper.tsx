'use client';

import { useRef, useState, useEffect } from 'react';
import styles from './FooterMenuWrapper.module.css'

type Props = {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
};

export const FooterMenuComponent = ({ title, children, defaultOpen = false }: Props) => {
    const [open, setOpen] = useState(defaultOpen);
    const contentRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;
        if (open) {
            el.style.maxHeight = `${el.scrollHeight}px`;
        } else {
            el.style.maxHeight = '0px';
        }
    }, [open]);


    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => {
            if (open) el.style.maxHeight = `${el.scrollHeight}px`;
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, [open]);

    return (
        <div className={styles.block}>
            <button
                type="button"
                className={styles.header}
                onClick={() => setOpen(v => !v)}
                aria-expanded={open}
            >
                <span className={styles.title}>{title}</span>
                <Arrow className={`${styles.arrow} ${open ? styles.arrowOpen : ''}`} />
            </button>

            <div ref={contentRef} className={styles.inner} aria-hidden={!open}>
                <div className={styles.innerPadding}>
                    {children}
                </div>
            </div>
        </div>
    );
};

function Arrow({ className = '' }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
    );
}
