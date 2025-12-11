import { postResponse, putResponse } from "@/api/restAPI";


export function sendRepeatProgress(userId: number | string, word: number, raise: boolean, pair?: string | null) {

    const data = {
        method: '/word_actions/train',
        data: {
            user: userId,
            id: word,
            raise: raise,
            pair
        }
    }
    console.log(data)
    putResponse(data);
}


export function sendAddWord(userId: number | string, word: number, is_studied: boolean, pair?: string | null) {
    const data = {
        method: '/word_actions/train',
        data: {
            user: userId,
            id: word,
            is_studied: is_studied,
            pair
        }
    }
    postResponse(data);
}




export function sendSentenceProgress(userID: number | string, sentenceID: number, raise: boolean) {
    const data = {
        method: '/sentence_actions/train',
        data: {
            user: userID,
            id: sentenceID,
            raise: raise ? 1 : ''
        }
    }
    console.log(data)
    putResponse(data);
}
