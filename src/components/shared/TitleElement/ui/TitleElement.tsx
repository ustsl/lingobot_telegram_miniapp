import React from 'react';
import styles from './titleElement.module.css';
import classNames from 'classnames';

export interface ITitleBlock {
    tag: 'h1' | 'h2' | 'h3' | 'h4';
    text: string;
    style?: 'green' | 'light'
}

export const TitleBlock = ({ tag, text, style }: ITitleBlock) => {
    const containerClasses = classNames(styles.title, {
        [styles.green]: style === 'green',
        [styles.light]: style === 'light'
    });

    const createTag = (tag: string, text: string) => {
        const allowedTags = ['h1', 'h2', 'h3', 'h4'];
        if (allowedTags.includes(tag)) {
            return React.createElement(tag, { className: containerClasses }, text);
        } return <></>
    }

    return createTag(tag, text);
}

