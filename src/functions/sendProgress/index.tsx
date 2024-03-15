import { postResponse } from "@/api/restAPI";

export function sendProgress(userId: number | string, word: string, isRaise: 0 | 1, isStudied: 0 | 1, isRepeat: 0 | 1) {
    const data = {
        method: '/customer/create_progress/',
        data: {
            user: userId,
            word: word,
            raise_progress: isRaise,
            is_studied: isStudied,
            repeat: isRepeat
        }
    }
    postResponse(data);
}