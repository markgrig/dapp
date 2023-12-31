import styles from './Footer.module.scss'
import { FC } from 'react'
import Image, { StaticImageData } from 'next/image'
import Links, { link } from '../Links'
import Contacts, { contact } from '../Contacts'


type FooterProps = {
    appLogo: StaticImageData,
    links: Array<link>,
    contacts: Array<contact>,
    BottomText: string
}

const Footer: FC<FooterProps> = (
    {
        appLogo,
        links,
        contacts,
        BottomText
    }) => {
    return (
        <footer className={styles.footer}>
            <div className={styles.items}>
                {Links.length !== 0 &&
                    <Links elements={links}></Links>
                }
                <div className={styles['logo-overflow']}>
                    <Image
                        className={styles.logo}
                        src={appLogo}
                        priority
                        alt={'dont loaded'} />
                </div>
                {contacts.length !== 0 &&
                    <Contacts elements={contacts}></Contacts>
                }
            </div>
            {
                <div className={styles['bottom-text']}>
                    {BottomText}
                </div>
            }
        </footer>
    )
}

export default Footer
