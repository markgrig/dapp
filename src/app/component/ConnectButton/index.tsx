
import { FC, ReactNode, MouseEventHandler } from 'react'
import styles from './ConnectButton.module.scss'
import Image, { StaticImageData } from 'next/image'
import { useMemo } from 'react'

type ButtonProps = {
    children?: ReactNode,
    leftLogo: StaticImageData,
    rightLogo: StaticImageData,
    onClick: MouseEventHandler<HTMLButtonElement>,
    isSuccess: boolean
}

const ConnectButton: FC<ButtonProps> = (
    {
        children,
        leftLogo,
        rightLogo,
        onClick,
        isSuccess
    }) => {
    const buttonClassName = useMemo(()=>isSuccess? `${styles.button} ${styles['--success']}`:styles.button,[isSuccess])

    return (
        <button className={buttonClassName}
            onClick={onClick}>
            {isSuccess ?
                <div className={styles.content}>
                    <Image
                        className={styles.ico}
                        src={leftLogo}
                        alt="Not loaded" />
                    {children}
                    <Image
                        className={styles.ico}
                        src={rightLogo}
                        alt="Not loaded" />
                </div>
                :
                children
            }
        </button>
    )
}

export default ConnectButton