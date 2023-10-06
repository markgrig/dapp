import appLogo from '@/app/img/sfxdx-logo.svg'
import metamaskLogo from '@/app/img/metamask-logo.svg'
import connectLogo from '@/app/img/connect-logo.svg'
import facebookLogo from '@/app/img/facebook-logo.svg'
import twiterLogo from '@/app/img/twiter-logo.svg'
import youtubeLogo from '@/app/img/youtube-logo.svg'
import instLogo from '@/app/img/inst-logo.svg'

import { link } from '@/app/component/Links'
import { contact } from '@/app/component/Contacts'

export const logos = {
    app: appLogo,
    metamask: metamaskLogo,
    connect: connectLogo,
}

export const contactsLogos = [
    { src: facebookLogo },
    { src: twiterLogo },
    { src: youtubeLogo },
    { src: instLogo }
] as Array<contact>

export const footerLinks = [
    { text: "Privacy Policy" },
    { text: "Terms & Conditions" },
    { text: "Cookie Policy" }
] as Array<link>

export const footerText = "©2022 All rights reserved. Powered by Atla" 