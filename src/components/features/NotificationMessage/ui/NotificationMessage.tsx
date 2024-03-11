// Notification.js or Notification.tsx if you're using TypeScript

import React, { useEffect, useState } from 'react';
import styles from './notification.module.css'; // Ensure you create corresponding CSS

export const NotificationComponent = ({ message }: { message: string }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (message) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
            }, 3500);
            return () => clearTimeout(timer);
        }
    }, [message]);

    if (!show) return null;

    return (
        <div className={styles.notification}>
            {message}
        </div>
    );
};