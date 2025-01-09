'use client'

import styles from './cardAnimationWrapper.module.css'

import { CSSTransition, TransitionGroup } from "react-transition-group";


interface Props {
    children: React.ReactNode
    keyUniq: number
}

export const CardAnimationWrapper: React.FC<Props> = ({
    children,
    keyUniq
}) => {
    return (
        <TransitionGroup className={styles.container}>
            <CSSTransition
                key={keyUniq}
                timeout={300}
                classNames={{
                    enter: styles.enter,
                    enterActive: styles.enterActive,
                    exit: styles.exit,
                    exitActive: styles.exitActive,
                }}
                unmountOnExit
            >
                {children}
            </CSSTransition>
        </TransitionGroup>


    );
};
