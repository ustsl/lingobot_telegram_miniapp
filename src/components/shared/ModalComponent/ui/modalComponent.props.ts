export interface IModalComponent {
    openModal: boolean;
    handleModal: (status: boolean) => void;
    width?: '100%';
    children: React.ReactNode;
}