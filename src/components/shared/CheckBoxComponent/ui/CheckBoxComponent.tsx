import styles from './checkboxComponent.module.css'

export const CheckBoxComponent = ({ checked, title, subtitle, value, onChange }:
    { checked: boolean, title: string, subtitle?: string, value: string | number, onChange: () => void }) => {
    return (
        <label>
            <input
                type="checkbox"
                value={value}
                checked={checked}
                onChange={onChange}
            />
            <span className={styles.title}>{title}</span>
            {subtitle && <span className={styles.subtitle}>{subtitle}</span>}

        </label>
    )
}