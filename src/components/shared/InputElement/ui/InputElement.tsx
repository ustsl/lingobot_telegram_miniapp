import styles from './inputElement.module.css';
import classNames from 'classnames';

import { IInputElement, ITextAreaElement } from './inputElement.props';
import { ChangeEvent } from 'react';



export const clFunc = ({ firstStyle, weight, size }: any) => {

    return classNames(firstStyle, {
        [styles.strong]: weight === 'strong',
        [styles.xsInput]: size === 'xs',
    });

}



export const InputElement = ({ label, type, value, placeholder, weight, size, maxLength, handler, onBlur, readOnly }: IInputElement) => {
    const firstStyle = styles.field;
    const finnalyStyle = clFunc({ firstStyle, weight, size })
    return (
        <div className={styles.inputElem}>
            <label>{label}</label>
            <input
                className={finnalyStyle}
                placeholder={placeholder ? placeholder : label}
                type={type}
                value={value}
                onChange={handler}
                maxLength={maxLength}
                onBlur={onBlur}
                readOnly={readOnly} />

        </div>
    )
}


export const TextareaElement = ({ label, value, placeholder, handler, rows, cols, weight, size }: ITextAreaElement) => {
    const firstStyle = `${styles.field} ${styles.areaField}`;
    const finnalyStyle = clFunc({ firstStyle, weight, size });
    return (
        <div className={styles.textareaElem}>
            <label>{label}</label>
            <textarea
                className={finnalyStyle}
                placeholder={placeholder ? placeholder : label}
                value={value}
                rows={rows}
                cols={cols}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => handler(event)}
            />
        </div>
    )
}