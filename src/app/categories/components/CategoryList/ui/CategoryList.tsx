'use client'

import { postResponse } from '@/api/restAPI';
import { ButtonComponent } from "@/components/shared/ButtonComponent";
import { GridBlock } from "@/components/shared/GridBlock"
import { useBaseStore, useUserStore } from '@/store/useStore';
import { useState } from 'react'
import { NotificationComponent } from '@/components/features/NotificationMessage';
import { CheckBoxComponent } from '@/components/shared/CheckBoxComponent';

interface ICategory {
    id: number;
    title: string;
}

export const CategoryList = ({ categories }: { categories: ICategory[] }) => {
    const userId = useBaseStore((state: any) => state.userId);
    const { userCategories, setUserCategories } = useUserStore((state: any) => state);
    const [isChange, setIsChange] = useState(false);

    const [notificationMessage, setNotificationMessage] = useState('');



    function handleSetCategories(item: number) {

        setIsChange(true);
        if (userCategories.includes(item)) {
            setUserCategories(userCategories.filter((curr: number) => curr !== item));
        } else {
            setUserCategories([...userCategories, item]);
        }
    }

    function handleSave() {
        setNotificationMessage('');
        const data = {
            method: '/customer/set_word_categories/',
            data: {
                user: userId,
                word_categories: userCategories.join(',')
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
                        <CheckBoxComponent
                            key={item.id}
                            value={item.id}
                            checked={userCategories && userCategories.includes(item.id)}
                            onChange={() => handleSetCategories(item.id)}
                            title={item.title} />

                    ))}
                </GridBlock>
                {isChange && <ButtonComponent text="Сохранить" onClick={handleSave} />}
            </GridBlock>
            {notificationMessage && <NotificationComponent message={notificationMessage} />}

        </div>
    );
}