import { create } from "zustand";

export const useModalStore = create((set) => ({
  modalIsOpen: false,
  setOpenModal: () => set({ modalIsOpen: true }),
  setCloseModal: () => set({ modalIsOpen: false }),
}));

export const useBaseStore = create((set) => ({
  tg: null,
  userId: null,
  pair: "tr-ru" as string | null,
  initPairFromLocation: () => {
    if (typeof window === "undefined") return;
    const pair = new URLSearchParams(window.location.search).get("pair");
    if (pair) set({ pair });
  },
  setPair: (pair: string | null) => set({ pair }),
  setTg: (tg: any) =>
    set(() => ({
      tg: tg,
      userId: tg?.initDataUnsafe?.user?.id,
      // Для разработки юзера нужно закомментировать и раскомментировать айди ниже
      //userId: 315854463,
    })),
  removeTg: () => set({ tg: null }),
  removeUserId: () => set({ userId: null }),
}));

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
  setUserCategories: (userCategories: number[]) =>
    set({ userCategories: userCategories }),
}));
