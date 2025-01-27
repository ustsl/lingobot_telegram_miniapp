import styles from './taskMessage.module.css'
import translate from './taskMessage.forms.json'
import { PersonKey, PolarityKey, TenseKey } from '../../../verbsQuiz.props'



interface ITaskMessage {
    currentTense: TenseKey
    currentPolarity: PolarityKey
    currentPerson: PersonKey

}

export const TaskMessage = ({ currentTense, currentPolarity, currentPerson }: ITaskMessage) => {
    const message = translate[currentPerson][currentTense][currentPolarity]
    return (
        <div className={styles.task}>
            <h4>Впишите глагол в следующей форме</h4>
            <p className={styles.text}>{message}</p>
        </div>
    )
}