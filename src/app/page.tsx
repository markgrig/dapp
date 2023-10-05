
"use client";
import Button from './component/Button'
import Footer from './component/Footer'
import Header from './component/Header'
import Loader from './component/Loader/Loader';
import Background from './component/Background';

import styles from './page.module.scss'

import appLogo from '@/app/img/sfxdx-logo.svg'
import facebookLogo from '@/app/img/facebook-logo.svg'
import twiterLogo from '@/app/img/twiter-logo.svg'
import youtubeLogo from '@/app/img/youtube-logo.svg'
import instLogo from '@/app/img/inst-logo.svg'
import metamaskLogo from '@/app/img/metamask-logo.svg'
import connectLogo from '@/app/img/connect-logo.svg'

import { link } from '@/app/component/Links'
import { contact } from '@/app/component/Contacts'

import { useSelector } from "react-redux";
import { connectWallet } from '@/app/store/redusers/accountAddress/asyncActions/connectWallet';
import { RootState, useAppDispatch } from '@/app/store/index';
import { accountAddressSlice } from './store/redusers/accountAddress';
import { useMemo, useEffect } from 'react';
import getShortString from './utils/getShortString';

export default function App() {
  const dispatch = useAppDispatch()
  const addressWallet = useSelector((state: RootState) => state.accountAddress.address)
  const isConnectingWallet = useSelector((state: RootState) => state.accountAddress.isConnecting)
  const { setAddress } = accountAddressSlice.actions

  useEffect(() => {
    const handleAccountsChanged = (a: Array<string>) => {
      a[0] ? dispatch(setAddress(a[0])) : dispatch(setAddress(""))
    }
    const handleChainChanged = () => { window.location.reload(); }

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
        window.ethereum.removeListener('chainChanged', handleAccountsChanged)
      }
    }
  }, [])

  const shortAddressWallet = useMemo(() => getShortString(addressWallet, 9, 4), [addressWallet])

  const contacts = [
    { src: facebookLogo },
    { src: twiterLogo },
    { src: youtubeLogo },
    { src: instLogo }
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
      <Header appLogo={appLogo}>
        <Button onClick={connectUserWallet}
          leftLogo={metamaskLogo}
          rightLogo={connectLogo}>
          {
            isConnectingWallet ?
              <Loader></Loader> :
              <div> {shortAddressWallet || 'Connect Wallet'}</div>
          }
        </Button>
      </Header>
      <main className={styles.content}></main>
      <Background
        firstColor={'rgba(178, 241, 222, 1)'}
        secondColor={'rgba(58, 201, 34, 0.7)'} />
      <Footer
        appLogo={appLogo}
        contacts={contacts}
        links={links}
        BottomText={footerText} />
    </div>
  )
}
