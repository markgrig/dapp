
import { StaticImageData } from 'next/image'
import Image from 'next/image'
import { FC, ReactNode } from 'react'
import styles from './Header.module.scss'

type HeaderProps = {
    logoSrc: StaticImageData,
    children?: ReactNode,
}

const Header: FC<HeaderProps> = (
    {
        logoSrc,
        children
    }) => {
    return (
        <header className={styles.header}>
            <div className={styles["logo-box"]}>
                <Image
                    className={styles.logo}
                    src={logoSrc}
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