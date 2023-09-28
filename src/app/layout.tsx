import './global.scss'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import StoreWrapper from './component/StoreWrapper/index';

export const metadata: Metadata = {
  title: 'TestApp',
  description: 'For company sfxdx',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StoreWrapper>
          {children}
        </StoreWrapper>
      </body>
    </html>
  )
}
