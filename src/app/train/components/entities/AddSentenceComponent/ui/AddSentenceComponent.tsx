import { postResponse } from "@/api/restAPI"
import { NotificationComponent } from "@/components/features/NotificationMessage";
import { RegularButtonComponent } from "@/components/shared/RegularButtonComponent"
import { useBaseStore } from "@/store/useStore";
import { useState } from "react";

export const AddSentenceComponent = ({ sentence, ru }: { sentence: string, ru: string }) => {

    const userId = useBaseStore((state: any) => state.userId);
    const [notificationMessage, setNotificationMessage] = useState('');

    function handleSave() {
        setNotificationMessage('');
        const data = {
            method: '/sentence_actions/add_sentence/',
            data: {
                user: userId,
                sentence: sentence,
                ru: ru
            }
        };

        postResponse(data).then((res) => {
            setNotificationMessage(res?.message)
            console.log(res)
        });
    }



    return (
        <>
            <RegularButtonComponent text={'Добавить в личный словарь'} onClick={handleSave} />
            {notificationMessage && <NotificationComponent message={notificationMessage} />}
        </>

    )
}