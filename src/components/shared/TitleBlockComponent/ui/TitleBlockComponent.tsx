import React from 'react';
import styles from './titleElement.module.css';
import classNames from 'classnames';
import { baseSizeType } from '@/app/globals.types';

type tagType = 'h1' | 'h2' | 'h3' | 'h4' | 'span';

export interface ITitleBlock {
    tag: tagType;
    text: string;
    size: baseSizeType
    center?: true
}

export const TitleBlockComponent = ({ tag, text, size, center }: ITitleBlock) => {
    const containerClasses = classNames(styles.title, {
        [styles[`size${size}`]]: size,
        [styles.center]: center
    });

    const createTag = (tag: tagType, text: string) => {
        return React.createElement(
            tag,
            { className: containerClasses, dangerouslySetInnerHTML: { __html: text } }
        );
    }

    return createTag(tag, text);
}

