import styles from './Loader.module.scss'
import { FC } from 'react'

const Loader: FC = () => {
    return (
            <div className={styles.loader}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
    )
}

export default Loader
