'use client'

import { postResponse } from '@/api/restAPI';
import { ButtonComponent } from "@/components/shared/ButtonComponent";
import { GridBlock } from "@/components/shared/GridBlock"
import { useBaseStore, useUserStore } from '@/store/useStore';
import { useEffect, useState } from 'react'
import { NotificationComponent } from '@/components/features/NotificationMessage';
import { CheckBoxComponent } from '@/components/shared/CheckBoxComponent';
import { CategoryWord } from './categoryList.props';

interface ICategory {
    id: number;
    title: string;
}

export const CategoryList = () => {
    const userId = useBaseStore((state: any) => state.userId);
    const [categories, setCategories] = useState<CategoryWord[]>([])
    const [isLoad, setIsLoad] = useState(false)
    const { userCategories, setUserCategories } = useUserStore((state: any) => state);
    const [isChange, setIsChange] = useState(false);

    const [notificationMessage, setNotificationMessage] = useState('');



    useEffect(() => {
        console.log('categoryUseEffect')
        if (userId) {
            handleSetCategoryData(userId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);


    function handleSetCategoryData(userId: number) {
        console.log('get-categories')
        const data = {
            method: "/word/get_user_word_categories/",
            data: { user: userId }
        }
        postResponse(data)
            .then((result: any) => {
                console.log(result)
                if (result && (result).length > 0) {
                    setCategories(result)
                }
            }).then(() => {
                setIsLoad(true)
            })
    }

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
                    {isLoad && categories.map((item) => (
                        <CheckBoxComponent
                            key={item.id}
                            value={item.id}
                            checked={userCategories && userCategories.includes(item.id)}
                            onChange={() => handleSetCategories(item.id)}
                            title={`${item.title}`}
                            subtitle={`добавлено ${item.added_percentage}%`} />

                    ))}
                </GridBlock>
                {isChange && <ButtonComponent text="Сохранить" onClick={handleSave} />}
            </GridBlock>
            {notificationMessage && <NotificationComponent message={notificationMessage} />}

        </div>
    );
}