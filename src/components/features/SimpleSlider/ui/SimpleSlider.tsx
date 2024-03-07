'use client'

import styles from './simpleSlider.module.css';

import { Arrow } from '@/components/shared/Arrow';
import { useState, ReactNode } from 'react';

interface SliderProps {
    children: ReactNode[];
    initialIndex?: number;
}

export const SimpleSlider = ({ children, initialIndex = 0 }: SliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);


    const handleArrowClick = (direction: 'left' | 'right') => {
        setCurrentIndex(prevIndex => {
            if (direction === 'left') {
                return prevIndex > 0 ? prevIndex - 1 : children.length - 1;
            } else {
                return prevIndex < children.length - 1 ? prevIndex + 1 : 0;
            }
        });
    };

    let touchStart: number | null = null;
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        touchStart = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (touchStart === null) {
            return;
        }
        const currentTouch = e.targetTouches[0].clientX;
        const diff = touchStart - currentTouch;

        if (diff > 50) {
            handleArrowClick('right');
            touchStart = null;
        } else if (diff < -50) {
            handleArrowClick('left');
            touchStart = null;
        }
    };

    const handleTouchEnd = () => {
        touchStart = null;
    };


    return (
        <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={styles.slider}
        >
            <div>
                {children[currentIndex]}
            </div>

            {children.length > 1 &&
                <div className={styles.arrows}>
                    <Arrow direction='left' size='L' onClick={() => handleArrowClick('left')} />
                    <div className={styles.points}>
                        {children.map((_, index) => (
                            <div
                                key={index}
                                className={`${styles.point} ${index === currentIndex ? styles.activePoint : ''}`}
                            />
                        ))}
                    </div>
                    <Arrow direction='right' size='L' onClick={() => handleArrowClick('right')} />
                </div>}
        </div>
    );
};
