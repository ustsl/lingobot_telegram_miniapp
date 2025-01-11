export const CheckBoxComponent = ({ checked, title, value, onChange }:
    { checked: boolean, title: string, value: string | number, onChange: () => void }) => {
    return (
        <label>
            <input
                type="checkbox"
                value={value}
                checked={checked}
                onChange={onChange}
            />
            {title}
        </label>
    )
}