import { baseSizes } from '@/types/baseTypes';
import styles from './gridBlock.module.css';
import classNames from 'classnames';

interface IGridBlock {
    gridSize?: baseSizes;
    padding?: baseSizes;
    separator?: true;
    children: any
}

export const GridBlock = ({ gridSize, separator, children, padding }: IGridBlock) => {
    const className = classNames(
        styles.grid,
        separator && styles.separator,
        gridSize && styles[`gridSize${gridSize}`],
        padding && styles[`padding${padding}`]
    );

    return <div className={className}>{children}</div>;
}
