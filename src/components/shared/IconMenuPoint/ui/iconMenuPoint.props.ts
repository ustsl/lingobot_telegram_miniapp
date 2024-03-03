
import { baseSizes } from '@/types/baseTypes';
import { ReactNode } from 'react';

export interface IIconMenuPoint {
    text: string;
    link: string;
    icon: ReactNode;
    iconColor?: string;
    size?: baseSizes;
    fontSize?: baseSizes;
}