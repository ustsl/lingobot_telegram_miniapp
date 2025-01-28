import styles from './rulesComponent.module.css'

import { GridBlock } from "@/components/shared/GridBlock";
import { useModalWrapper } from "@/components/shared/ModalWindowWrapper";
import { RegularButtonComponent } from "@/components/shared/RegularButtonComponent";

interface Rule {
    title: string;
    description: string;
}

export const RulesComponent = ({ rule }: { rule: Rule }) => {

    const { setIsOpenModal, setContentModal } = useModalWrapper()

    const handleClick = () => {
        const ModalContent =
            <GridBlock gridSize="XS">
                <h4>{rule.title}</h4>
                <p>{rule.description}</p>
            </GridBlock>
        setContentModal(ModalContent)
        setIsOpenModal(true)
    };

    return (
        <div className={styles.block}>
            <RegularButtonComponent text={"Показать правило"} onClick={handleClick} />
        </div>
    )
}