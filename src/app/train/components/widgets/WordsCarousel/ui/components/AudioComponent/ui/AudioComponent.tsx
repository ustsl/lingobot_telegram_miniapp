import React, { useEffect, useState, useRef } from 'react';
import styles from './audioComponent.module.css';
import { API_DOMAIN } from "@/api/settings";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';

export const AudioComponent = ({ soundPath }: { soundPath: string }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        const handleEnded = () => {
            setIsPlaying(false);
        };

        if (audio) {
            audio.addEventListener('ended', handleEnded);
        }

        return () => {
            if (audio) {
                audio.removeEventListener('ended', handleEnded);
            }
        };
    }, []);

    const link = `${API_DOMAIN}${soundPath}`;

    return (
        <div className={styles.audioContainer}>
            <button className={styles.playButton} onClick={togglePlayPause}>
                <FontAwesomeIcon icon={faHeadphones} />
            </button>
            <audio
                ref={audioRef}
                src={link}
                style={{ display: 'none' }}>
                Your browser does not support the <code>audio</code> element.
            </audio>
        </div>
    );
};
