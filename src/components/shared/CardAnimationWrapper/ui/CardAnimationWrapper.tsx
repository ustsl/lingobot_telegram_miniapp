'use client'

import React, { useRef, ReactNode } from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import styles from './cardAnimationWrapper.module.css'

interface Props {
    children: ReactNode
    keyUniq: number | string
}

export const CardAnimationWrapper: React.FC<Props> = ({ children, keyUniq }) => {
    const nodeRef = useRef<HTMLDivElement>(null)

    return (
        <div className={styles.container}>
            <SwitchTransition mode="out-in">
                <CSSTransition
                    key={keyUniq}
                    nodeRef={nodeRef}
                    timeout={300}
                    classNames={{
                        enter: styles.enter,
                        enterActive: styles.enterActive,
                        exit: styles.exit,
                        exitActive: styles.exitActive,
                    }}
                    unmountOnExit
                >
                    <div ref={nodeRef} className={styles.cardWrapper}>
                        {children}
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </div>
    )
}
