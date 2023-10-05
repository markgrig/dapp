import Button from '../Button'
import styles from './Modal.module.scss'
import { FC, ReactNode, MouseEventHandler, useMemo } from 'react'
import crossLogo from '@/app/img/cross-logo.svg'
import Image from 'next/image'

type ButtonProps = {
    headText: string,
    children: ReactNode,
    buttonText: string,
    onClick: MouseEventHandler<HTMLButtonElement>,
}

const Modal: FC<ButtonProps> = (
    {
        headText,
        children,
        buttonText,
        onClick
    }
) => {
    const existChildren = useMemo(() => children ? true : false, [children])

    return (
        existChildren ?
            <div className={styles.background}>
                <div className={styles.modal}>
                    <div className={styles.head}>
                        {headText}
                    </div>
                    <div className={styles.children}>
                        {children}
                    </div>
                    <Image src={crossLogo} className={styles.cross} alt="Not loaded" />
                    <Button
                        onClick={onClick}>
                        {buttonText}
                    </Button>
                </div>
            </div>
            :
            <></>
    )
}

export default Modal
