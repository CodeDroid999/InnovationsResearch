/* eslint-disable react/no-unescaped-entities */

import { UserAuth } from 'context/AuthContext'
import Image from 'next/image'
import Link from 'next/link'
import router from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { MdHome } from 'react-icons/md'
import { HiOutlineBarsArrowDown } from "react-icons/hi2";
import { PiSidebarSimpleFill } from "react-icons/pi";
import { FaHistory } from "react-icons/fa";
import { FaPlusSquare } from "react-icons/fa";


const SideNav = () => {

  const [isUsaBankLogsOpen, setIsUsaBankLogsOpen] = useState(false)
  const [isCanadianBankLogsOpen, setIsCanadianBankLogsOpen] = useState(false)
  const [isPaypalCashappOpen, setIsPaypalCashappOpen] = useState(false)
  const [isVerifiedAccountsOpen, setIsVerifiedAccountsOpen] = useState(false)
  const [isShotScriptOpen, setIsShotScriptOpen] = useState(false)
  const [isCloneCardsOpen, setIsCloneCardsOpen] = useState(false)
  const { user, userId, userRole, logOut } = UserAuth()

  const handleLogOut = () => {
    logOut()
    router.push("/auth/sign-in")
    toast.success("Logging Out!")
  }
  const toggleUsaBankLogs = () => {
    setIsUsaBankLogsOpen(!isUsaBankLogsOpen)
  }

  const toggleCanadianBankLogs = () => {
    setIsCanadianBankLogsOpen(!isCanadianBankLogsOpen)
  }

  const togglePaypalCashapp = () => {
    setIsPaypalCashappOpen(!isPaypalCashappOpen)
  }

  const toggleVerifiedAccounts = () => {
    setIsVerifiedAccountsOpen(!isVerifiedAccountsOpen)
  }
  const toggleShopScript = () => {
    setIsShotScriptOpen(!isShotScriptOpen)
  }
  const toggleCloneCards = () => {
    setIsCloneCardsOpen(!isCloneCardsOpen)
  }

  return (
    <div className="border-2 md:w-[15vw] w-[20vw]">
      <div className="p-2 bg-blue-100 flex font-bold items-center w-full border-2 border-gray-500 border-r border-l border-t justify-center align-center">
        <Image
          src="https://i.postimg.cc/wj7XKbp6/cardshoplogo.png"
          height={40}
          width={96}
          alt=""
        />
      </div>

      <div className="p-2 bg-blue-100 md:flex hidden font-bold justify-items-center w-full border-2 border-gray-500 border-r border-l border-t">
        <Link
          href="/"
          className="bg-blue-100 text-blue-800 text-left md:whitespace-nowrap font-bold"
        >
          Dashboard
        </Link>
      </div>
      <div className="p-2 bg-blue-100 md:hidden flex font-bold justify-items-center w-full border-2 border-gray-500 border-r border-l border-t">
        <Link
          href="/"
          className="bg-blue-100 flex align-items-center text-blue-800 text-left text-xs font-bold"
        >
          <MdHome size="30" />
        </Link>
      </div>
      {userRole === "Admin" && (
        <>
          <div className="p-2 font-bold  hidden md:flex items-center w-full border-2 border-gray-500 border-r border-l border-t">
            <Link
              href="/create-product"
              className="text-blue-800 text-center whitespace-nowrap"
            >
              Create Product
            </Link>
          </div>
          <div className="p-2 font-bold  hidden md:flex items-center w-full border-2 border-gray-500 border-r border-l border-t">
            <Link
              href="/create-methods"
              className="text-blue-800 text-center whitespace-nowrap"
            >
              Create Methods
            </Link>
          </div>
        </>
      )}
      <div className="p-2 bg-blue-100 md:hidden flex font-bold justify-items-center w-full border-2 border-gray-500 border-r border-l border-t">
        <Link
          href="/create-product"
          className="flex bg-blue-100 text-blue-800 text-right text-xs font-bold"
        ><FaPlusSquare size="30" />

        </Link>
      </div>
      <div className="p-2 hidden md:flex font-bold items-center w-full border-2 border-gray-500 border-r border-l border-t">
        <Link
          href={`/orders/${userId}`}
          className="text-blue-800 text-center whitespace-nowrap"
        >
          Orders
        </Link>
      </div>
      <div className="p-2 bg-blue-100 md:hidden flex font-bold justify-items-center w-full border-2 border-gray-500 border-r border-l border-t">
        <Link
          href={`/orders/${userId}`}
          className="flex bg-blue-100 text-blue-800 text-right text-xs font-bold"
        ><HiOutlineBarsArrowDown size="30" />

        </Link>
      </div>
      <div className="p-2 md:flex hidden font-bold items-center w-full border-2 border-gray-500 border-r border-l border-t">
        <Link
          href="/methods"
          className="text-blue-800 text-left md:whitespace-nowrap"
        >
          Methods
        </Link>
      </div>
      <div className="p-2 bg-blue-100 md:hidden flex font-bold justify-items-center w-full border-2 border-gray-500 border-r border-l border-t">
        <Link
          href="/methods"
          className="flex bg-blue-100 text-blue-800 text-right text-xs font-bold"
        ><PiSidebarSimpleFill size="30" />

        </Link>
      </div>
      <div className="p-2 md:flex hidden font-bold items-center w-full border-2 border-gray-500 border-r border-l border-t">
        <Link
          href={`/payment-history/${userId}`}
          className="text-blue-800 text-left md:whitespace-nowrap"
        >
          History
        </Link>
      </div>
      <div className="p-2 bg-blue-100 md:hidden flex font-bold justify-items-center w-full border-2 border-gray-500 border-r border-l border-t">
        <Link
          href={`/payment-history/${userId}`}
          className="flex bg-blue-100 text-blue-800 text-right text-xs font-bold"
        ><FaHistory size="30" />
        </Link>
      </div>
      <div className="p-2 bg-blue-100 md:hidden flex font-bold justify-items-center w-full border-2 border-gray-500 border-r border-l border-t">
        <div
          className="flex md:hidden bg-blue-100 text-blue-800 text-right text-xs font-bold"
        ><span className="text-xs whitespace-nowrap">Bank Logs</span>
        </div>
      </div>
      <div className="relative inline-block w-full">
        <div
          onClick={toggleUsaBankLogs}
          className="text-sm p-2 md:flex hidden font-bold items-center w-full border-2 border-gray-500 border-r border-l border-t text-blue-800 text-left md:whitespace-nowrap"
        >
          USA BANK LOGS
        </div>
        <div onClick={toggleUsaBankLogs} className="p-2 bg-blue-100 md:hidden flex font-bold justify-items-center w-full border-2 border-gray-500 border-r border-l border-t">
          <span className="text-sm text-center underline whitespace-nowrap">USA</span>
        </div>
        {isUsaBankLogsOpen && (
          <div className="flex flex-col rounded text-black bg-gray-100 p-2 shadow-md">
            <Link
              href="/shop/chase-bank"
              className="text-black underline hover:font-bold hover-text-green-800"
            >
              Chase Bank
            </Link>

            <Link
              href="/shop/pnc-bank"
              className="text-black underline hover:font-bold hover-text-green-800"
            >
              PNC Bank
            </Link>
            <Link
              href="/shop/rfcu-bank"
              className="text-black underline hover:font-bold hover-text-green-800"
            >
              RBFCU BANK
            </Link>{' '}

            <Link
              href="/shop/citi-bank"
              className="text-black underline hover:font-bold hover-text-green-800"
            >
              Citi Bank
            </Link>
            <Link
              href="/shop/boa-bank"
              className="text-black underline hover:font-bold hover-text-green-800"
            >
              Boa Bank
            </Link>

            <Link
              href="/shop/mt-bank"
              className="text-black underline hover:font-bold hover-text-green-800"
            >
              M&T Bank
            </Link>
            <Link
              href="/shop/wells-fargo"
              className="text-black underline hover:font-bold hover-text-green-800"
            >
              WellsFargo          </Link>
          </div>
        )}
      </div>
      <div className="relative inline-block w-full">
        <div
          onClick={toggleCanadianBankLogs}
          className="text-sm p-2 md:flex hidden font-bold items-center w-full border-2 border-gray-500 border-r border-l border-t text-blue-800 text-left md:whitespace-nowrap"
        >
          CANADIAN BANK LOGS
        </div>
        <div onClick={toggleCanadianBankLogs} className="p-2 bg-blue-100 md:hidden flex font-bold justify-items-center w-full border-2 border-gray-500 border-r border-l border-t">
          <span className="text-sm text-center underline whitespace-nowrap">Canada</span>
        </div>
        {isCanadianBankLogsOpen && (
          <div className="flex flex-col rounded text-black bg-gray-100 p-2 shadow-md">
            <Link
              href="/shop/scotia-bank"
              className="text-black underline hover:font-bold hover-text-green-800"
            >
              Scotia Bank
            </Link>
            <Link
              href="/shop/cibc-bank"
              className="text-black underline hover:font-bold hover-text-green-800"
            >
              CIBC Bank
            </Link>
            <Link
              href="/shop/rbc-bank"
              className="text-black underline hover:font-bold hover-text-green-800"
            >
              RBC Bank
            </Link>
            <Link
              href="/shop/td-bank"
              className="text-black underline hover:font-bold hover-text-green-800"
            >
              TD BANK
            </Link>
          </div>
        )}
      </div>
      <div className="p-2 bg-blue-100 md:hidden flex font-bold justify-items-center w-full border-2 border-gray-500 border-r border-l border-t">
        <div
          className="flex bg-blue-100 text-blue-800 text-right text-xs font-bold"
        ><span className="text-xs whitespace-nowrap">Dark Logs</span>
        </div>
      </div>
      <div className="relative inline-block w-full">
        <div
          onClick={togglePaypalCashapp}
          className="text-sm md:flex hidden p-2 font-bold items-center w-full border-2 border-gray-500 border-r border-l border-t text-blue-800 text-left "
        >
          PAYPAL_CASHAPP
        </div>
        <div
          onClick={togglePaypalCashapp}
          className="text-black underline text-sm p-2 font-bold flex md:hidden items-center w-full border-2 border-gray-500 border-r border-l border-t text-left "
        >
          Paypal
        </div>
        {isPaypalCashappOpen && (
          <div className="flex flex-col rounded text-black bg-gray-100 p-2 shadow-md">
            <Link
              href="/shop/paypal"
              className="text-black md:text-lg text-xs"
            >
              Paypal Bank
            </Link>
            <Link
              href="/shop/cash-app"
              className="text-black  md:text-lg text-xs"
            >
              CASHAPP Bank
            </Link>
          </div>
        )}
      </div>
      <div className="relative inline-block w-full">
        <div
          onClick={toggleVerifiedAccounts}
          className="text-sm p-2 md:flex hidden font-bold items-center w-full border-2 border-gray-500 border-r border-l border-t text-blue-800 text-left md:whitespace-nowrap"
        >
          VERIFIED ACCOUNTS
        </div>
        <div
          onClick={toggleVerifiedAccounts}
          className="text-sm p-2 flex md:hidden font-bold items-center w-full border-2 border-gray-500 border-r border-l border-t text-black underline text-left md:whitespace-nowrap"
        >
          Walllets
        </div>

        {isVerifiedAccountsOpen && (
          <div className="flex flex-col rounded text-black bg-gray-100 p-2 shadow-md">
            <Link
              href="/shop/blockchain"
              className="text-black underline hover:font-bold hover-text-green-800"
            >
              BLOCKCHAIN
            </Link>
            <Link
              href="/shop/coin-base"
              className="text-black underline hover:font-bold hover-text-green-800"
            >
              COINBASE
            </Link>
          </div>
        )}
      </div>
      <div className="relative inline-block w-full">
        <div
          onClick={toggleShopScript}
          className="text-sm p-2 md:flex hidden font-bold items-center w-full border-2 border-gray-500 border-r border-l border-t text-blue-800 text-left md:whitespace-nowrap"
        >
          SHOPWTHSCRIPT
        </div>
        <div
          onClick={toggleShopScript}
          className="text-sm p-2 flex md:hidden font-bold items-center w-full border-2 border-gray-500 border-r border-l border-t text-black underline text-left md:whitespace-nowrap"
        >
          Scripts
        </div>
        {isShotScriptOpen && (
          <div className="flex flex-col rounded text-black bg-gray-100 p-2 shadow-md">
            <Link
              href="/shop/shop-with-script"
              className="text-black underline hover:font-bold hover-text-green-800"
            >
              Shopwithscript
            </Link>

          </div>
        )}
      </div>
      <div className="relative inline-block w-full">
        <div
          onClick={toggleCloneCards}
          className="text-sm p-2 md:flex hidden font-bold items-center w-full border-2 border-gray-500 border-r border-l border-t text-blue-800 text-left md:whitespace-nowrap"
        >
          CLONECARDS
        </div>
        <div
          onClick={toggleCloneCards}
          className="text-sm p-2 flex md:hidden font-bold items-center w-full border-2 border-gray-500 border-r border-l border-t text-black underline text-left md:whitespace-nowrap"
        >
          Cards
        </div>
        {isCanadianBankLogsOpen && (
          <div className="flex flex-col rounded text-black bg-gray-100 p-2 shadow-md">
            <Link
              href="/shop/clone-cards"
              className="text-black underline hover:font-bold hover-text-green-800"
            >
              Clonecards
            </Link>

          </div>
        )}
      </div>
      <div className="p-2 flex font-bold items-center w-full border-2 border-gray-500 border-r border-l border-t">
        <Link
          href="/shop/email-flood"
          className="text-sm md:text-lg text-blue-800 text-left md:whitespace-nowrap"
        >
          Email Flood
        </Link>

      </div>
      <div className="p-2 flex font-bold items-center w-full border-2 border-gray-500 border-r border-l border-t">
        <Link
          href="/shop/vpn"
          className="text-sm md:text-lg text-blue-800 text-left"
        >
          VPN/RDP's
        </Link>
      </div>{' '}
      <div className="p-2 flex font-bold items-center w-full border-2 border-gray-500 border-r border-l border-t">
        <Link
          href="/shop/escrow"
          className="text-sm md:text-lg text-blue-800 text-left md:whitespace-nowrap"
        >
          Escrow
        </Link>
      </div>
      <div onClick={handleLogOut} className="pointer p-2 mb-8 flex font-bold items-center w-full border-2 border-gray-500 hover:bg-red-400  border-r border-l border-t bg-red-600 text-gray-100">
        Log out
      </div>
    </div >
  )
}

export default SideNav


