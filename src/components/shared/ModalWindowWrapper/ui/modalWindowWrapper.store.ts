import { create } from 'zustand';
import { ReactNode } from 'react';

interface IuseModalWrapper {
    isOpenModal: boolean;
    contentModal: ReactNode;
    modalStyle: 'base' | 'clear'
    setIsOpenModal: (isOpenModal: boolean) => void;
    setContentModal: (contentModal: ReactNode) => void;
    setModalStyle: (isOpenModal: 'base' | 'clear') => void;
}

export const useModalWrapper = create<IuseModalWrapper>((set) => ({
    isOpenModal: false,
    contentModal: null,
    modalStyle: 'base',
    setIsOpenModal: (isOpenModal) =>
        set((state) => ({
            isOpenModal,
            contentModal: isOpenModal ? state.contentModal : null,
            modalStyle: isOpenModal ? state.modalStyle : 'base',
        })),
    setContentModal: (contentModal) => set({ contentModal }),
    setModalStyle: (modalStyle) => set({ modalStyle }),
}));
