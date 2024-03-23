import { create } from 'zustand'


export const useBaseStore = create((set) => ({
    tg: null,
    userId: null,
    setTg: (tg: any) => set(() => ({
        tg: tg,
        userId: tg?.initDataUnsafe?.user?.id
        // userId: 348958472
    })),
    removeTg: () => set({ tg: null }),
    removeUserId: () => set({ userId: null }),
}))



export const useUserStore = create((set) => ({
    isLoad: false,
    newWordLimit: 5,
    repeatWordLimit: 5,
    trainType: "TR",
    subscribeFinishDate: "",
    userCategories: [],
    setIsLoad: (isLoad: boolean) => set({ isLoad: isLoad }),
    setNewWordLimit: (limit: number) => set({ newWordLimit: limit }),
    setRepeatWordLimit: (limit: number) => set({ repeatWordLimit: limit }),
    setSubscribeFinishDate: (date: string) => set({ subscribeFinishDate: date }),
    setTrainType: (trainType: number) => set({ trainType: trainType }),
    setUserCategories: (userCategories: number[]) => set({ userCategories: userCategories }),
}))