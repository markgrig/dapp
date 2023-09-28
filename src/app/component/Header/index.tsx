
import { StaticImageData } from 'next/image'
import Image from 'next/image'
import { FC, ReactNode } from 'react'
import styles from './Header.module.scss'

type HeaderProps = {
    appLogo: StaticImageData,
    children?: ReactNode,
}

const Header: FC<HeaderProps> = (
    {
        appLogo,
        children
    }) => {
    return (
        <header className={styles.header}>
            <div className={styles["logo-overflow"]}>
                <Image
                    className={styles.logo}
                    src={appLogo}
                    priority
                    alt={'dont loaded'} />
            </div>
            <div className={styles.childrens}>
                {children}
            </div>
        </header>
    )
}

export default Header