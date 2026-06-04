import Head from 'next/head'
import React from 'react'

import SideNav from './side-nav'
import CryptoMarquee from './CryptoMarquee'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col">
      <div className="flex bg-gray-300 ">
        <SideNav />
        {children}
      </div>
      <div className="cryptoMarquee fixed bottom-0 min-w-100">
        <CryptoMarquee />
      </div>
    </div>
  )
}
