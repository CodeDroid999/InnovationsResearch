import { UserAuth } from 'context/AuthContext'
import Image from 'next/image'
import Link from 'next/link'
import router from 'next/router'
import profile from 'public/profile.jpeg'
import React, { useState } from 'react'

export default function Avartar() {
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
  const handleSwitchMode = () => {
    router.push('/setup-profile')
  }

  return (
    <div className=" relative inline-flex justify-end ">
      <span onClick={toggleMainDropdown}>
        <Image
          src={user?.profilePicture || profile}
          alt="profile"
          width={50}
          height={50}
          className="h-[2rem] w-[2rem] cursor-pointer rounded-full object-cover"
        />
      </span>
      {isMainDropdownOpen && (
        <div className="absolute right-0 top-8 mt-2 min-w-[15rem] rounded-lg bg-white p-2  shadow-md ">
          <div className="rounded bg-gray-100 pt-2 pb-2 border">
            <Link href={`/public-profile/${user?.userId}`}>
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
          <div className="flex ">
            {userRole === 'Student' && (
              <Link
                href="/browse-bookings"
                className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 mt-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100"
              >
                Browse bookings
              </Link>
            )}

            {userRole === 'Tutor' && (
              <Link
                href="/boost-earnings"
                className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1  mt-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100"
              >
                Boost Earnings
              </Link>
            )}
          </div>
          <div className="flex ">
            {userRole === 'Tutor' && (
              <Link
                href={`/application-history/${user?.userId}`}
                className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100"
              >
                Application History
              </Link>
            )}
          </div>
          <div className="flex ">
            {userRole === 'Student' && (
              <Link
                href="/post-bookings"
                className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100"
              >
                Post bookings
              </Link>
            )}

            {userRole === 'Tutor' && (
              <Link
                href="/bid-bookings"
                className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100"
              >
                Bid bookings
              </Link>
            )}
          </div>
          <div className="flex ">
            {userRole === 'Student' && (
              <Link
                href={`/my-bookings/${user?.userId}`}
                className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100"
              >
                My bookings
              </Link>
            )}

            {userRole === 'Tutor' && (
              <Link
                href={`/orders/${user?.userId}`}
                className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100"
              >
                My Orders
              </Link>
            )}
          </div>

          <Link
            className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100"
            href={`/profile/${user?.userId}`}
          >
            My Profile
          </Link>

          <Link
            className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 py-2 text-sm text-gray-800 hover:bg-neutral-100  border w-100 "
            href={`/booking-history/${user?.userId}`}
          >
            Payment History
          </Link>
          <Link
            className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100  "
            href={`/payment-methods/${user?.userId}`}
          >
            Payment Methods
          </Link>
          <div className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100  ">
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
            className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100  "
          >
            Log out
          </div>
          <div
            onClick={handleSwitchMode}
            className="flex cursor-pointer items-center gap-x-3.5 rounded-md px-3 mb-1 py-2 text-sm text-gray-800 hover:bg-gray-100  border w-100 "
          >
            Swap to Student Mode
          </div>
        </div>
      )}
    </div>
  )
}
