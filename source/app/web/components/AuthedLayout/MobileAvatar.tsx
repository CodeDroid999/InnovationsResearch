import { UserAuth } from 'context/AuthContext'
import Image from 'next/image'
import Link from 'next/link'
import profile from 'public/profile.jpeg'
import React, { useState } from 'react'

export default function MobileAuthedAvatar() {
  const { user, logOut } = UserAuth()
  const userRole = user?.role
  const userId = user?.userId
  const handleLogOut = () => {
    logOut()
  }
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMainDropdownOpen, setIsMainDropdownOpen] = useState(false)
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
  const toggleMainDropdown = () => {
    setIsMainDropdownOpen(!isMainDropdownOpen)
  }

  return (
    <div className="relative z-50">
      <div
        onClick={toggleMainDropdown}
        className="flex items-center justify-center border border-gray-100 shadow-inner rounded-full bg-transparent px-2.5 py-2.5 text-regular text-white duration-300 ease-in-out hover:bg-primary"
      >
        <span className="mr-2 md:text-lg font-medium text-xs text-white hover:text-blue-600">
          Account
        </span>
        <div className="inline-flex justify-end ">
          <span onClick={toggleMainDropdown}>
            <Image
              src={user?.profilePicture || profile}
              alt="profile"
              width={25}
              height={25}
              className="h-[1.6rem] w-[1.6rem] cursor-pointer rounded-full object-cover"
            />
          </span>
        </div>
      </div>
      {isMainDropdownOpen && (
        <div className="absolute right-0 top-8 mt-2 z-50 min-w-[15rem] rounded-lg bg-white p-2 shadow-md ">
          <div className="rounded bg-gray-100 pt-2 pb-2 border">
            <Link href={`/profile/${user?.userId}`}>
              <span className="flex items-center gap-x-3.5 px-3 pt-1 text-sm text-blue-900 hover:bg-neutral-100 ">
                <Image
                  src={user?.profilePicture || profile}
                  alt="profile"
                  width={25}
                  height={25}
                  className="h-[1.6rem] w-[1.6rem] cursor-pointer rounded-full object-cover"
                />
                {user?.displayName}
              </span>
            </Link>
          </div>

          <Link
            className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100"
            href={`/booking`}
          >
            Make Booking
          </Link>
          <Link
            className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100"
            href={`/bus-hire`}
          >
            Hire a bus
          </Link>
          <Link
            className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100"
            href={`/parcels`}
          >
            Parcels
          </Link>

          <div className="flex ">
            {!user ? (
              <Link
                href="/login"
                className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 mt-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100"
              >
                About Us
              </Link>
            ) : (
              <div>
                <Link
                  className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100"
                  href={`/profile/${user?.userId}`}
                >
                  My Profile
                </Link>
                <Link
                  className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100"
                  href={`/booking-history/${user?.userId}`}
                >
                  Booking History
                </Link>

                <div className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100 ">
                  <div
                    onClick={toggleDropdown}
                    className="mt-1 flex cursor-pointer items-center text-sm text-gray-800 hover:bg-gray-100 "
                  >
                    Settings
                  </div>
                </div>
                {isDropdownOpen && (
                  <div className="flex flex-col rounded p-1 text-sm text-gray-800 w-100 bg-gray-200">
                    <Link
                      className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100 "
                      href={`/settings/mobile-number/${user?.userId}`}
                    >
                      Mobile
                    </Link>
                    <Link
                      className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100 "
                      href={`/settings/email/${user?.userId}`}
                    >
                      Email
                    </Link>
                    <Link
                      className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100 "
                      href="/forgot-password"
                    >
                      Change password
                    </Link>
                  </div>
                )}
                <div
                  onClick={handleLogOut}
                  className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100 "
                >
                  Log out
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
