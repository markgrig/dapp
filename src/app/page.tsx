
"use client";
import ConnectButton from './component/ConnectButton'
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
import Modal from './component/Modal/Modal';

export default function App() {
  const dispatch = useAppDispatch()
  const addressWallet = useSelector((state: RootState) => state.accountAddress.address)
  const modalWindowMessage = useSelector((state: RootState) => state.accountAddress.message)
  const isConnectingWallet = useSelector((state: RootState) => state.accountAddress.isConnecting)

  const { setAddress, setMessage } = accountAddressSlice.actions

  useEffect(() => {
    const handleAccountsChanged = (a: Array<string>) => {
      if (a[0]) { dispatch(setAddress(a[0])) } else {
        dispatch(setAddress(""))
        dispatch(setMessage(
          {
            head: "Disconect",
            text: "User disconected."
          }
        ))
      }
    }
    const handleChainChanged = (a: string) => {
      if (a !== '0x5') {
        dispatch(setAddress(""))
        dispatch(setMessage({
          head: "Wrong network",
          text: "Wrong network. Select Goerli network."
        }))
      }
    }

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)
      window.ethereum.on('disconnect', () => console.log(123))
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
        window.ethereum.removeListener('chainChanged', handleAccountsChanged)
      }
    }
  }, [])

  const shortAddressWallet = useMemo(() => getShortString(addressWallet, 9, 4), [addressWallet])
  const existAccount = useMemo(() => addressWallet ? true : false as boolean, [addressWallet])

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

  function clickModalButton() {
    dispatch(setMessage(""))
  }

  return (
    <div className={styles.wrapper}>
      <Header appLogo={appLogo}>
        <ConnectButton onClick={connectUserWallet}
          leftLogo={metamaskLogo}
          rightLogo={connectLogo}
          isSuccess={existAccount}>
          {
            isConnectingWallet ?
              <Loader></Loader> :
              <div> {shortAddressWallet || 'Connect Wallet'}</div>
          }
        </ConnectButton>
        <Modal
          headText={modalWindowMessage.head}
          buttonText='Okey'
          onClick={clickModalButton}
        >
          {modalWindowMessage.text}
        </Modal>
      </Header>
      <main className={styles.content}></main>
      <Background
        firstColor={'rgba(178, 241, 222, 1)'}
        secondColor={'rgba(58, 201, 34, 0.5)'} />
      <Footer
        appLogo={appLogo}
        contacts={contacts}
        links={links}
        BottomText={footerText} />
    </div>
  )
}
