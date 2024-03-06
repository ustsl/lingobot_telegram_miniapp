import { ButtonComponent } from '@/app/train/components/shared/ButtonComponent';
import styles from './buttonsComponent.module.css';

export const ButtonsComponent = () => {
    return (
        <div className={styles.buttons}>
            <ButtonComponent onClick={() => alert(1)} text="Изучить" color="success" />
            <ButtonComponent onClick={() => alert(1)} text="Уже знаю" />
        </div>
    )
}