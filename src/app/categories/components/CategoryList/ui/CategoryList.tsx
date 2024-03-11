'use client'

import { postResponse } from '@/api/restAPI';
import styles from './categoryList.module.css';

import { ButtonComponent } from "@/app/train/components/shared/ButtonComponent";
import { GridBlock } from "@/components/shared/GridBlock"
import { useBaseStore, useUserStore } from '@/store/useStore';
import { useState } from 'react'
import { NotificationComponent } from '@/components/features/NotificationMessage';

interface ICategory {
    id: number;
    title: string;
}

export const CategoryList = ({ categories }: { categories: ICategory[] }) => {
    const userId = useBaseStore((state: any) => state.userId);
    const userCategories = useUserStore((state: any) => state.userCategories);
    const [isChange, setIsChange] = useState(false);
    const [choiceCategories, setChoiceCategories] = useState<number[]>(userCategories);
    const [notificationMessage, setNotificationMessage] = useState('');



    function handleSetCategories(item: number) {
        setIsChange(true);
        if (choiceCategories.includes(item)) {
            setChoiceCategories(prevState => prevState.filter(curr => curr !== item));
        } else {
            setChoiceCategories(prevState => [...prevState, item]);
        }
    }

    function handleSave() {
        setNotificationMessage('');
        const data = {
            method: '/customer/set_word_categories/',
            data: {
                user: userId,
                word_categories: choiceCategories.join(',')
            }
        };
        postResponse(data).then(() => {
            setNotificationMessage('Изменения успешно сохранены')
        });
        setIsChange(false);
    }

    return (
        <div>
            <GridBlock gridSize='M'>
                <GridBlock gridSize="XS">
                    {categories.map((item) => (
                        <label className={styles.label} key={item.id}>
                            <input
                                type="checkbox"
                                value={item.id}
                                checked={choiceCategories.includes(item.id)}
                                onChange={() => handleSetCategories(item.id)}
                                className={styles.input}
                            />
                            {item.title}
                        </label>
                    ))}
                </GridBlock>
                {isChange && <ButtonComponent text="Сохранить" onClick={handleSave} />}
            </GridBlock>
            {notificationMessage && <NotificationComponent message={notificationMessage} />}

        </div>
    );
}