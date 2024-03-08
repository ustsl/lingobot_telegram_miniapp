import { ChangeEvent } from 'react';

export interface IInputElement {
    handler: (event: ChangeEvent<HTMLInputElement>) => void;
    label: string;
    placeholder?: string;
    value: string | number;
    size?: 'xs' | 's' | 'm';
    weight?: 'strong'
    type?: 'password' | 'number' | 'email' | 'color';
    maxLength?: number;
    onBlur?: any
    readOnly?: boolean



}

export interface ITextAreaElement extends Omit<IInputElement, 'type' | 'handler'> {
    rows?: number;
    cols?: number;
    handler: any
}