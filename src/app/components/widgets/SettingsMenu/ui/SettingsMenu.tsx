'use client';


import { PointName } from '@/components/shared/PointName'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsProgress, faCheck, faWallet } from '@fortawesome/free-solid-svg-icons'
import { IconMenuButtonPoint, IconMenuPoint } from '@/components/shared/IconMenuPoint/ui/IconMenuPoint';
import { GridBlock } from '@/components/shared/GridBlock';
import { useBaseStore, useModalStore, useUserStore } from '@/store/useStore';
import { postResponse } from '@/api/restAPI';
import { useTelegram } from '@/hooks/useTelegram';


export const SettingsMenu = () => {

    const { tg } = useTelegram()

    const userId = useBaseStore((state: any) => state.userId)
    const trainType = useUserStore((state: any) => state.trainType)
    const setTrainType = useUserStore((state: any) => state.setTrainType)
    const { setOpenModal } = useModalStore((state: any) => state)

    function handleSave() {
        const newTrainType = trainType == 'TR' ? 'RU' : 'TR'
        const data = {
            method: '/customer/set_user_train_type/',
            data: {
                user: userId,
                train_type: newTrainType
            }
        }
        postResponse(data);
        setTrainType(newTrainType)

    }

    function paymentTgHandler() {
        tg.sendData('payment');
    }

    return (
        <GridBlock gridSize='XS'>
            <PointName text={'Управление'} />



            <IconMenuPoint
                link='/limits'
                text="Изменить суточный лимит слов"
                fontSize='S'
                icon={<FontAwesomeIcon icon={faBarsProgress} />}
            />
            <IconMenuPoint
                link='/categories'
                text="Выбрать категории слов на изучение"
                fontSize='S'
                icon={<FontAwesomeIcon icon={faBarsProgress} />}
            />



            <IconMenuButtonPoint size="S"
                text={trainType == "TR" ? "Режим перевода: с турецкого на русский" : "Режим перевода: с русского на турецкий"}
                icon={<FontAwesomeIcon icon={faCheck} />}
                onClick={handleSave}
                fontSize='S'
            />

            <IconMenuButtonPoint size="S"
                text={"Сбросить прогресс тренировок"}
                icon={<FontAwesomeIcon icon={faCheck} />}
                onClick={setOpenModal}
                fontSize='S'
            />


        </GridBlock>
    )
}