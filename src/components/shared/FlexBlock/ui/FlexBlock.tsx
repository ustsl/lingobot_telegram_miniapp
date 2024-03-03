import { baseSizes } from '@/types/baseTypes';
import styles from './flexBlock.module.css';
import classNames from 'classnames';

export interface IFlexBlock {
    children: React.ReactNode;
    alignment?: 'start' | 'end';
    vertical?: 'start' | 'end';
    direction?: 'row' | 'column';
    gap?: baseSizes
}

export const FlexBlock = ({ children, alignment, vertical, direction, gap }: IFlexBlock) => {
    const classList = classNames(
        styles.flex,
        {
            [styles.flexStart]: alignment === 'start',
            [styles.flexEnd]: alignment === 'end',
            [styles.alignStart]: vertical === 'start',
            [styles.alignEnd]: vertical === 'end',
            [styles.flexColumn]: direction === 'column',
            [styles[`gap${gap}`]]: gap
        }
    );

    return (
        <div className={classList}>
            {children}
        </div>
    )
}
