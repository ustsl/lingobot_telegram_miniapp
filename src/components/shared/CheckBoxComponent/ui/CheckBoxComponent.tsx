import styles from './checkBoxComponent.module.css';

export const CheckBoxComponent = ({ checked, title, value, onChange }:
    { checked: boolean, title: string, value: string | number, onChange: () => void }) => {
    return (
        <label className={styles.label}>
            <input
                type="checkbox"
                value={value}
                checked={checked}
                onChange={onChange}
                className={styles.input}
            />
            {title}
        </label>
    )
}