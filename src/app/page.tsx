
"use client";
import ConnectButton from './component/ConnectButton'
import Footer from './component/Footer'
import Header from './component/Header'
import Loader from './component/Loader/Loader';
import Background from './component/Background';
import Modal from './component/Modal/Modal';

import styles from './page.module.scss'
import * as CONSTANT from '@/app/constant'

import { useSelector } from "react-redux";
import { useMemo, useEffect } from 'react';
import { connectWallet } from '@/app/store/redusers/accountAddress/asyncActions/connectWallet';
import { RootState, useAppDispatch } from '@/app/store/index';
import { accountAddressSlice } from './store/redusers/accountAddress';
import getShortString from './utils/getShortString';

export default function App() {
  const dispatch = useAppDispatch()
  const addressWallet = useSelector((state: RootState) => state.accountAddress.address)
  const modalWindowMessage = useSelector((state: RootState) => state.accountAddress.message)
  const isConnectingWallet = useSelector((state: RootState) => state.accountAddress.isConnecting)

  const { handleAccountsChanged, handleChainChanged, setMessage } = accountAddressSlice.actions

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (e) => dispatch(handleAccountsChanged(e)))
      window.ethereum.on('chainChanged', (e) => dispatch(handleChainChanged(e)))
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', (e) => dispatch(handleAccountsChanged(e)))
        window.ethereum.removeListener('chainChanged', (e) => dispatch(handleChainChanged(e)))
      }
    }
  }, [])

  const shortAddressWallet = useMemo(() => getShortString(addressWallet, 9, 4), [addressWallet])
  const existWallet = useMemo(() => addressWallet ? true : false as boolean, [addressWallet])

  function connectUserWallet() {
    dispatch(connectWallet())
  }

  function exitModal() {
    dispatch(setMessage(""))
  }

  return (
    <div className={styles.wrapper}>
      <Header appLogo={CONSTANT.logos.app}>
        <ConnectButton onClick={connectUserWallet}
          leftLogo={CONSTANT.logos.metamask}
          rightLogo={CONSTANT.logos.connect}
          isSuccess={existWallet}>
          {
            isConnectingWallet ?
              <Loader></Loader> :
              <div> {shortAddressWallet || 'Connect Wallet'}</div>
          }
        </ConnectButton>
        <Modal
          headText={modalWindowMessage.head}
          buttonText='Okey'
          onClickButton={exitModal}
          onClickCross={exitModal}
        >
          {modalWindowMessage.text}
        </Modal>
      </Header>
      <main className={styles.content}></main>
      <Background
        firstColor={'rgba(178, 241, 222, 1)'}
        secondColor={'rgba(58, 201, 34, 0.5)'} />
      <Footer
        appLogo={CONSTANT.logos.app}
        contacts={CONSTANT.contactsLogos}
        links={CONSTANT.footerLinks}
        BottomText={CONSTANT.footerText} />
    </div>
  )
}
