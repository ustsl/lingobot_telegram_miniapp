import { postResponse } from "@/api/restAPI"
import { NotificationComponent } from "@/components/features/NotificationMessage";
import { RegularButtonComponent } from "@/components/shared/RegularButtonComponent"
import { useBaseStore } from "@/store/useStore";
import { useState } from "react";

export const AddSentenceComponent = ({ sentence, translate}: { sentence: string, translate: string }) => {

    const userId = useBaseStore((state: any) => state.userId);
    const [notificationMessage, setNotificationMessage] = useState('');

    function handleSave() {
        setNotificationMessage('');
        const data = {
            method: '/sentence_actions/add_sentence',
            data: {
                user: userId,
                sentence: sentence,
                translate: translate
            }
        };

        postResponse(data).then((res) => {
            setNotificationMessage(res?.message)
            console.log(res)
        });
    }



    return (
        <>
            <RegularButtonComponent text={'В личный словарь'} onClick={handleSave} />
            {notificationMessage && <NotificationComponent message={notificationMessage} />}
        </>

    )
}