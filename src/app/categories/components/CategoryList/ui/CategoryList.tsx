'use client'

import { postResponse } from '@/api/restAPI';
import styles from './categoryList.module.css';

import { ButtonComponent } from "@/app/train/components/shared/ButtonComponent";
import { GridBlock } from "@/components/shared/GridBlock"
import { useBaseStore, useUserStore } from '@/store/useStore';
import { useState } from 'react'

interface ICategory {
    id: number;
    title: string;
}

export const CategoryList = ({ categories }: { categories: ICategory[] }) => {

    const userId = useBaseStore((state: any) => state.userId)
    const userCategories = useUserStore((state: any) => state.userCategories)
    const [isChange, setIsChange] = useState(false);
    const [choiseCategories, setChoiseCategories] = useState<number[]>(userCategories)

    function handleSetCategories(item: number) {
        setIsChange(true);
        if (choiseCategories.includes(item)) {
            setChoiseCategories(prevState => prevState.filter(curr => curr !== item))
        } else {
            setChoiseCategories(prevState => [...prevState, item])
        }
    }

    function handleSave() {
        const data = {
            method: '/customer/set_word_categories/',
            data: {
                user: userId,
                word_categories: choiseCategories.join(',')
            }
        }
        postResponse(data).then((res) => {
            console.log(res)
        });
        setIsChange(false)
    }


    return (
        <GridBlock gridSize='M'>
            <GridBlock gridSize="XS">
                {categories.map((item) => {
                    return (

                        <label className={styles.label} key={item.id}>
                            <input
                                type="checkbox"
                                value={item.id}
                                checked={choiseCategories.includes(item.id)}
                                onChange={() => handleSetCategories(item.id)}
                                className={styles.input}
                            />
                            {item.title}
                        </label>

                    )
                })}
            </GridBlock>
            {isChange ? <ButtonComponent text="Сохранить" onClick={handleSave} /> : <p>Несохраненные изменения отсутствуют</p>}

        </GridBlock>
    )
}