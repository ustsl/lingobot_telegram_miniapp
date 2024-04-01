'use client'




import { postResponse } from "@/api/restAPI"
import { ButtonComponent } from "@/app/train/components/shared/ButtonComponent"
import { NotificationComponent } from "@/components/features/NotificationMessage"
import { CheckBoxComponent } from "@/components/shared/CheckBoxComponent"
import { ModalComponent } from "@/components/shared/ModalComponent"
import { useBaseStore, useModalStore, useUserStore } from "@/store/useStore"
import { useEffect, useState } from "react"



export const ResetProgressComponent = () => {
    const [isFull, setIsFull] = useState(false)
    const [notificationMessage, setNotificationMessage] = useState('');

    const { modalIsOpen, setCloseModal } = useModalStore((state: any) => state)
    const userId = useBaseStore((state: any) => state.userId)
    const { trainType, setTrainType } = useUserStore((state: any) => state)

    useEffect(() => {
        setNotificationMessage('')
    }, [isFull]);

    function handleReset() {
        const data = {
            method: '/customer/reset_progress/',
            data: {
                user: userId,
                format: `${isFull ? 'full' : 'part'}`
            }
        }
        postResponse(data).then(() =>
            setNotificationMessage(`Изменения успешно сохранены. ${isFull ? 'Весь прогресс сброшен' : 'Слова "Уже знаю" сброшены'}`))

    }


    return (
        <>
            <ModalComponent isOpen={modalIsOpen} onClose={setCloseModal}>
                <p>Внимание. По умолчанию будет сброшен прогресс только по словам, которые были отмечены как уже ранее известные.
                    Если вы хотите сбросить весь прогресс, а не только ранее выученные слова, выделите галочку. </p>
                <CheckBoxComponent
                    value={1}
                    checked={isFull}
                    onChange={() => setIsFull(!isFull)}
                    title={'Сбросить весь прогресс'} />
                <ButtonComponent text={"Сбросить прогресс"} onClick={handleReset} />
            </ModalComponent>
            {notificationMessage && <NotificationComponent message={notificationMessage} />}
        </>
    )
}