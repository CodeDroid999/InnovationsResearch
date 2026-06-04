import Link from 'next/link'
import React from 'react'
import { Toaster } from 'react-hot-toast'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-[1280px] px-3 sm:px-6 md:px-16 bg-gray-200">
      <Toaster position="bottom-center" />
      <header className="flex flex-row items-center justify-between  bg-gray-200 py-2 duration-300 ease-in">
        <h1 className="text-3xl font-bold md:text-2xl ">
          <Link href="/">Cardshop</Link>
        </h1>
      </header>
      <main className="mx-auto mt-8 pb-12 w-full max-w-[400px]  md:mt-16">
        {children}
      </main>
    </div>
  )
}
