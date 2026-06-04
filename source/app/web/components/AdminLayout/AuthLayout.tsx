import Link from 'next/link'
import React from 'react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-[1280px] px-3 sm:px-6 md:px-16">
      <header className="flex flex-row items-center justify-between  bg-white py-2 duration-300 ease-in">
        <h1 className="text-4xl font-bold md:text-5xl ">
          <Link href="/">NorthExpress</Link>
        </h1>
      </header>
      <main className="mx-auto mt-6 w-full max-w-[400px]  md:mt-10">
        {children}
      </main>
    </div>
  )
}
