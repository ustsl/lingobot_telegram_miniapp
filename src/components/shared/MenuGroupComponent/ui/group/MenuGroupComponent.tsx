import styles from './MenuGroupComponent.module.css'

export const MenuGroupComponent = ({ title, icon, children }: { children: React.ReactNode, title: string, icon: React.ReactNode }) => {
    return (
        <div className={styles.block}>
            <div className={styles.title}>{icon}<span>{title}</span></div>
            {children}
        </div>
    )
}