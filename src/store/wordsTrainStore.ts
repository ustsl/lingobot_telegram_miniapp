import { create } from 'zustand'

type StatusNewWordType = 'start' | 'learn' | 'finish'
type StatusRepeatWordType = Exclude<StatusNewWordType, 'learn'>;


export const newWordsTrainStore = create((set) => ({
    status: 'start',
    updateStatus: (status: StatusNewWordType) => set(() => ({
        status: status
    })),
    removeStatus: () => set({ status: 'start' }),
}))


export const repeatWordsTrainStore = create((set) => ({
    status: 'start',
    updateStatus: (status: StatusRepeatWordType) => set(() => ({
        status: status
    })),
    removeStatus: () => set({ status: 'start' }),
}))


