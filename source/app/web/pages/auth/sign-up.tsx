import AuthLayout from 'components/layout/AuthLayout'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithPopup,
} from 'firebase/auth'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'

import { auth, db } from '../../firebase'

export default function Signup() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [displayNameError, setDisplayNameError] = useState('')

  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/auth/sign-in')
      }
    })
    return () => unsubscribe()
  }, [router, redirect])

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })

    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      await addDoc(collection(db, 'users'), {
        userId: user.uid,
        displayName: user.displayName,
        email: user.email,
        profilePicture: user.photoURL || '', // Add profilePicture field with user's photo URL or empty string if not available
        role: 'customer',
        balance: '0',
        createdAt: serverTimestamp(),
      })
      await sendEmailVerification(user)
      toast.success(
        'Verification email has been sent. Please check your inbox.',
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleSignUp = async (event) => {
    event.preventDefault()
    let hasError = false

    if (!displayName) {
      setDisplayNameError('Full Name is required')
      hasError = true
    } else {
      setDisplayNameError('')
    }

    if (!email) {
      setEmailError('Email is required')
      hasError = true
    } else if (!email.includes('@')) {
      setEmailError('Enter a valid email!')
      hasError = true
    } else {
      setEmailError('')
    }

    if (!password) {
      setPasswordError('Password is required')
      hasError = true
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters')
      hasError = true
    } else {
      setPasswordError('')
    }

    if (hasError) {
      return
    }

    try {
      // Create user in authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      const user = userCredential.user

      // Add user data to Firestore
      await addDoc(collection(db, 'users'), {
        userId: user.uid,
        displayName: displayName,
        email: email,
        profilePicture: '', // Add empty profilePicture field for email sign-up users
        balance: '0',
        createdAt: serverTimestamp(),
      })

      // Send verification email
      await sendEmailVerification(user)

      // Display success message to user
      toast.success(
        'Verification email has been sent. Please check your inbox.',
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    // JSX code for the component
    <AuthLayout>
      {/* Google Sign In button */}
      <div className="flex justify-center align-center pt-1 pb-2">
        <button
          type="button"
          className="flex w-100 flex-row items-center justify-center rounded-2xl border border-gray-400 bg-gray-100 px-8 py-2 text-lg font-medium text-green-950 hover:bg-green-900 hover:text-white"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle className="mr-2" size={20} />
          Continue with Google
        </button>
      </div>

      {/* OR separator */}
      <div className="text-center text-xs font-medium text-gray-700 pt-2 pb-2">
        OR
      </div>

      <form onSubmit={handleSignUp} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <label
              htmlFor="displayName"
              className="mb-1 font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              placeholder="Full Name"
              onChange={(e) => setDisplayName(e.target.value)}
              className={`h-full w-full rounded-lg border bg-gray-50 p-2
                outline-none focus:border-blue-500`}
            />
            {displayNameError && (
              <span className="text-red-500">{displayNameError}</span>
            )}
          </div>
          <label htmlFor="email" className="mb-1 font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className={`h-full w-full rounded-lg border bg-gray-50 p-2
              outline-none focus:border-blue-500`}
          />
          {emailError && <span className="text-red-500">{emailError}</span>}
        </div>

        <div className="relative flex flex-col">
          <label htmlFor="password" className="mb-1 font-medium text-gray-700">
            Password
          </label>
          <div className="flex items-center">
            <input
              id="password"
              name="password"
              placeholder="Password"
              type={passwordVisible ? 'text' : 'password'}
              onChange={(e) => setPassword(e.target.value)}
              className="h-full w-full rounded-lg border bg-gray-50 p-2
                outline-none focus:border-blue-500 "
            />
            <button
              type="button"
              onClick={() => setPasswordVisible((prev) => !prev)}
              className="absolute right-2 "
            >
              {passwordVisible ? (
                <BsEyeFill size={18} />
              ) : (
                <BsEyeSlashFill size={18} />
              )}
            </button>
          </div>
          {passwordError && (
            <span className="text-red-500">{passwordError}</span>
          )}
        </div>

        <button
          type="submit"
          className="rounded-2xl bg-green-900 hover:bg-green-900 px-4 py-2 text-white"
        >
          Sign Up
        </button>

        <div className="flex flex-row space-x-3 text-base font-normal justify-items-center items-center">
          <p className="pt-1 pb-2 text-lg">Already have an account?</p>
          <p className="font-medium text-green-500 hover:text-green-950 items-center">
            <Link href="/auth/sign-in">Sign In</Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  )
}
