'use client';

import { postResponse } from "@/api/restAPI";
import { getDate } from "@/functions/getDate";
import { useTelegram } from "@/hooks/useTelegram";
import { useBaseStore, useUserStore } from "@/store/useStore";
import { useEffect } from "react";

export const TelegramWrapper = ({ children }: { children: React.ReactNode }) => {

    const { tg } = useTelegram()

    const userId = useBaseStore((state: any) => state.userId)
    const isLoad = useUserStore((state: any) => state.isLoad)
    const setIsLoad = useUserStore((state: any) => state.setIsLoad)
    const setSubscribeFinishDate = useUserStore((state: any) => state.setSubscribeFinishDate)
    const setNewWordLimit = useUserStore((state: any) => state.setNewWordLimit)
    const setRepeatWordLimit = useUserStore((state: any) => state.setRepeatWordLimit)
    const setTrainType = useUserStore((state: any) => state.setTrainType)
    const setUserCategories = useUserStore((state: any) => state.setUserCategories)

    useEffect(() => {
        console.log(userId)
        if (userId) {
            if (handleGetUserData(userId)) {
                handlePostStatData(userId)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);


    function handlePostStatData(userId: number) {
        const stat_data = {
            method: '/analytics/',
            data: {
                identity: userId,
                command: "load_mini_app",
            },
        };
        postResponse(stat_data);
    }


    function handleGetUserData(userId: number) {
        const data = {
            method: '/customer/get_or_create/',
            data: {
                user: userId
            }
        }

        postResponse(data).then((result: any) => {
            if (result) {
                const paymentFunction = result?.user_data?.payment_function
                const trainType = result?.user_data?.train_type
                const newWordLimit = result?.user_data?.new_word_limit
                const repeatWordLimit = result?.user_data?.repeat_word_limit
                const userCategories = result?.user_categories

                if (result?.user_data) {
                    setIsLoad(true)
                }
                if (paymentFunction) {
                    setSubscribeFinishDate(getDate(paymentFunction))
                }
                if (newWordLimit) {
                    setNewWordLimit(newWordLimit)
                }
                if (repeatWordLimit) {
                    setRepeatWordLimit(repeatWordLimit)
                }
                if (trainType) {
                    setTrainType(trainType)
                }
                if (userCategories) {
                    setUserCategories(userCategories)
                }

            }
        })
        return true
    }


    return (
        <>
            {tg && isLoad && children}
        </>
    )
}



