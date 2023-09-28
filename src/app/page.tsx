
"use client";
import Button from './component/Button'
import Footer from './component/Footer'
import Header from './component/Header'
import appLogoSrc from '@/app/img/sfxdx-logo.svg'
import styles from './page.module.scss'

import facebookLogoSrc from '@/app/img/facebook-logo.svg'
import twiterLogoSrc from '@/app/img/twiter-logo.svg'
import youtubeLogoSrc from '@/app/img/youtube-logo.svg'
import instLogoSrc from '@/app/img/inst-logo.svg'
import metamaskLogoSrc from '@/app/img/metamask-logo.svg'
import connectlogoSrc from '@/app/img/connect-logo.svg'

import { link } from '@/app/component/Links'
import { contact } from '@/app/component/Contacts'
import Elipse from './component/Elipse'

import { useSelector } from "react-redux";
import { connectWallet } from '@/app/store/redusers/web3Provider/asuncActions/connectWallet';
import { RootState, useAppDispatch } from '@/app/store/index';
import { web3ProviderSlice } from './store/redusers/web3Provider';
import { useMemo, useEffect } from 'react';
import Loader from './component/Loader/Loader';

export default function App() {
  const dispatch = useAppDispatch()
  const addressWallet = useSelector((state: RootState) => state.web3Provider.address)
  const isConnectingWallet = useSelector((state: RootState) => state.web3Provider.isConnecting)
  const { setAddress } = web3ProviderSlice.actions

  useEffect(() => {
    const handleAccountsChanged = (a: Array<string>) => {
      a[0] ? dispatch(setAddress(a[0])) : dispatch(setAddress(""))
    }
    const handleChainChanged = () => { window.location.reload(); }

    window.ethereum.on('accountsChanged', handleAccountsChanged)
    window.ethereum.on('chainChanged', handleChainChanged)

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
      window.ethereum.removeListener('chainChanged', handleAccountsChanged)
    }
  }, [])

  function getShortAddressWallet() {
    const leftSlice = 9
    const rightSlice = 4
    const len = addressWallet.length

    if (len > leftSlice + rightSlice) {
      const left = addressWallet.slice(0, leftSlice)
      const right = addressWallet.slice(len - rightSlice - 1, len - 1)
      return `${left}...${right}`
    }
    return addressWallet
  }

  const shortAddressWallet = useMemo(() => getShortAddressWallet(), [addressWallet])

  const contacts = [
    { src: facebookLogoSrc },
    { src: twiterLogoSrc },
    { src: youtubeLogoSrc },
    { src: instLogoSrc }
  ] as Array<contact>

  const links = [
    { text: "Privacy Policy" },
    { text: "Terms & Conditions" },
    { text: "Cookie Policy" }
  ] as Array<link>

  const footerText = "©2022 All rights reserved. Powered by Atla"

  function connectUserWallet() {
    dispatch(connectWallet())
  }

  return (
    <div className={styles.wrapper}>
      <Header logoSrc={appLogoSrc}>
        <Button onClick={connectUserWallet}
          metamaskLogoSrc={metamaskLogoSrc}
          connectlogoSrc={connectlogoSrc}>
          {
            isConnectingWallet ?
              <Loader></Loader> :
              shortAddressWallet || 'Connect Wallet'
          }
        </Button>
      </Header>
      <main className={styles.content}>
        <div className={styles['elipse-wrapper']}>
          <Elipse
            color={'rgba(178, 241, 222, 1)'}
            rotateX={-22}
            rotateY={-30}
            bottom={20}
            left={50} />
        </div>
        <div className={styles['elipse-wrapper']}>
          <Elipse
            color={'rgba(58, 201, 34, 0.7)'}
            rotateX={202}
            rotateY={30}
            bottom={20}
            left={25} />
        </div>
        <div className={styles['elipse-wrapper']}>
          <Elipse
            color={'rgba(58, 201, 34, 0.7)'}
            rotateX={22}
            rotateY={-30}
            bottom={-100}
            left={50} />
        </div>
        <div className={styles['elipse-wrapper']}>
          <Elipse
            color={'rgba(178, 241, 222, 1)'}
            rotateX={202}
            rotateY={-30}
            bottom={-100}
            left={25} />
        </div>
      </main>

      <Footer
        logoSrc={appLogoSrc}
        contacts={contacts}
        links={links}
        BottomText={footerText} />
    </div>
  )
}
