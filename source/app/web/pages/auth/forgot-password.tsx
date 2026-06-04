import AuthLayout from 'components/layout/AuthLayout'
import Head from 'next/head'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { firebaseConfig } from '../../firebase' // Import your Firebase configuration

export default function ForgotPassword() {
  const [email, setEmail] = useState('')

  const handleResetPassword = async () => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error('Please enter a valid email address.')
      return
    }
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${firebaseConfig.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            requestType: 'PASSWORD_RESET',
          }),
        },
      )

      if (response.ok) {
        toast.success('Password reset email sent. Please check your inbox.')
      } else {
        const data = await response.json()
        const errorMessage = data.error.message
        console.error('Error occurred:', errorMessage)
        toast.error('An error occurred. Try again')
      }
    } catch (error) {
      console.error('Error occurred:', error.message)
      toast.error('An error occurred.Try again.')
    }
  }

  return (
    <AuthLayout>
      <Head>
        <title>
          NorthExpress | Travel with comfort. Comfortable. Efficient. Affordable
          . At North Express, we are redefining the luxury transport, and
          setting new standards of excellence and reliability. |Travel with
          comfort. Comfortable. Efficient. Affordable . At North Express, we are
          redefining the luxury transport, and setting new standards of
          excellence and reliability. |Travel with comfort. Comfortable.
          Efficient. Affordable . At North Express, we are redefining the luxury
          transport, and setting new standards of excellence and reliability.
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="NorthExpress is your one-stop destination for finding the right bookings and talented taskers. Post any booking, pick the best person, and get it done. Join now to earn money as a tutor or post your bookings for free."
        />
        <meta
          name="keywords"
          content="NorthExpress, bookings, tutor, earn money, post booking"
        />
        <meta name="author" content="NorthExpress" />
        <meta name="robots" content="index, follow" />
        <meta
          name="og:title"
          property="og:title"
          content="NorthExpress | Get More Done"
        />
        <meta
          name="og:description"
          property="og:description"
          content="NorthExpress is your one-stop destination for finding the right bookings and talented taskers. Post any booking, pick the best person, and get it done. Join now to earn money as a tutor or post your bookings for free."
        />
        <meta
          name="og:image"
          property="og:image"
          content="public/sync-my-socials-logo.png"
        />

        <meta
          name="og:url"
          property="og:url"
          content="https://www.northexpresskenya.com"
        />
      </Head>

      <div className="align-center flex flex-col justify-center md:bg-white bg-gray-100 sm:h-screen w-100">
        <div>
          <p className="pb-3 text-center text-green-950">
            We will send you a link to change your password. Enter your email.
          </p>
        </div>
        <div className="align-center flex justify-center space-x-2">
          <div className="border p-1">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`h-full w-full rounded-lg border bg-gray-50 p-2
                  outline-none focus:border-green-500`}
            />
          </div>
          <div>
            <button
              onClick={handleResetPassword}
              className="rounded-2xl bg-green-900 px-4 py-2 text-white hover:bg-green-900"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
