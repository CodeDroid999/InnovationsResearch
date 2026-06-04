import AuthLayout from 'components/layout/AuthLayout'
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth'
import {
    addDoc,
    collection,
    doc,
    getDoc,
    serverTimestamp,
} from 'firebase/firestore'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'

import { auth, db } from '../../firebase'

export default function LogIn() {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirect = searchParams.get('redirect')

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Get the user's role from the database
                const userDocRef = doc(db, 'users', user.uid)
                getDoc(userDocRef)
                    .then((docSnapshot) => {
                        if (docSnapshot.exists()) {
                            const userData = docSnapshot.data()
                            const role = userData.role

                            // Redirect the user based on their role
                            if (role === 'Admin') {
                                router.push('/studio')
                            } else if (role === 'Customer') {
                                router.push(redirect || '/')
                            } else {
                                router.push(redirect || '/')
                            }
                        } else {
                            router.push(redirect || '/')
                        }
                    })
                    .catch((error) => {
                        console.error('Error getting user data:', error)
                        router.push(redirect || '/')
                    })

                toast.success('Logged In')
            }
        })

        return () => unsubscribe()
    }, [redirect, router])

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider()
        // Set the prompt option to force account selection
        provider.setCustomParameters({
            prompt: 'select_account',
        })

        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            const googleUserId = user.uid

            const userDocRef = doc(db, 'users', googleUserId)
            const userDocSnapshot = await getDoc(userDocRef)

            if (!userDocSnapshot.exists()) {
                const userRef = await addDoc(collection(db, 'users'), {
                    userId: user.uid,
                    displayName: user.displayName,
                    profilePicture: '',
                    balance: '0',
                    role: 'Customer',
                    email: user.email,
                    createdAt: serverTimestamp(),
                })
            }
        } catch (error) {
            const errorCode = error.code
            const errorMessage = error.message
        }
    }

    const handleSignIn = async (event: any) => {
        event.preventDefault()

        // Reset error messages
        setEmailError('')
        setPasswordError('')

        try {
            if (!email || !email.includes('@')) {
                throw new Error('Email is not valid')
            }

            if (!password || password.length < 6) {
                throw new Error('Password must be at least 6 characters')
            }

            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            )
            const user = userCredential.user

            // Display success message to user
            toast.success('Logged In')

            // Your existing code for making HTTP request to '/api/welcomeuser'
        } catch (error) {
            console.error('Error during sign-in:', error)

            if (error instanceof Error) {
                const errorMessage = error.message

                if (
                    errorMessage === 'auth/user-not-found' ||
                    errorMessage === 'auth/wrong-password'
                ) {
                    toast.error('Invalid email or password. Please try again.')
                } else {
                    toast.success(`Welcome back!`)
                }
            } else {
                toast.error('An unexpected error occurred. Please try again.')
            }
        }
    }

    return (
        <AuthLayout>
            <Head>
                <title>
                    Cardshop - Unlock secure online transactions with Cardshop. Explore our range of bank logs, carding tools, and tutorials for total anonymity. Join now for exclusive bonuses and top-notch customer support!
                </title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta
                    name="description"
                    content="Discover secure online transactions with Cardshop. Explore our range of bank logs, carding tools, and tutorials for total anonymity. Join now for exclusive bonuses and top-notch customer support!"         ></meta>
                <meta
                    name="keywords"
                    content="Bank Logs, Chase Bank, Huntington Bank, PNC Bank, RBFCU Bank, Woodforest Bank, Citi Bank, Boa Bank, Suntrust Bank, M&T Bank, WellsFargo Bank, Chime Bank, Canadian Logs, PayPal, CashApp, Verified Account, Shopwithscript, Clone Cards, Burners, Non VBV Cards, Dumps, Credit Cards, Debit Cards, SSN Fullz, Carded Gift, Tutorials, Business Tools, Credit Check, Personal Information, Email Flood, VPNs, Socks, RDPs, Escrow, Online Access, Account Routing Number, Name and Address, Email Access, Debit Card Details"
                />
                <meta name="author" content="Cardshop" />
                <meta name="robots" content="index, follow" />
                <meta
                    property="og:title"
                    content="Cardshop -  Cardshop - Unlock secure online transactions with Cardshop. Explore our range of bank logs, carding tools, and tutorials for total anonymity. Join now for exclusive bonuses and top-notch customer support!" />
                <meta
                    property="og:description"
                    content=" Cardshop - Unlock secure online transactions with Cardshop. Explore our range of bank logs, carding tools, and tutorials for total anonymity. Join now for exclusive bonuses and top-notch customer support!"
                />
                <meta property="og:image" content="/public/cardshoplogo.png" />
                <meta
                    property="og:url"
                    content="https://www.Cardshop.com"
                />
            </Head>

            {/* Google Sign In button */}
            <div className="flex justify-center align-center pt-1 pb-2">
                <button
                    type="button"
                    className="flex w-100 flex-row items-center justify-center rounded-2xl border border-gray-400 bg-gray-100 px-8 py-2 text-lg font-medium text-green-950 hover:bg-green-900 hover:text-white"
                    onClick={handleGoogleSignIn}
                >
                    <FcGoogle className="mr-2" size={20} />
                    Log in with Google
                </button>
            </div>

            {/* OR separator */}
            <div className="text-center text-xs font-medium text-gray-700 pt-2 pb-2">
                OR
            </div>

            {/* Sign In form */}
            <form onSubmit={handleSignIn} className="flex flex-col gap-4">
                {/* Email input */}
                <div className="flex flex-col">
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
                    outline-none focus:border-green-500`}
                    />
                    {emailError && <span className="text-red-500">{emailError}</span>}
                </div>

                {/* Password input */}
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
                    outline-none focus:border-green-500 "
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

                {/* Continue button */}
                <button
                    type="submit"
                    className="rounded-2xl bg-green-900 px-4 py-2 text-white hover:bg-green-900"
                >
                    Continue
                </button>

                {/* Sign up link */}
                <div className="flex flex-row space-x-3 text-base font-normal items-center">
                    <p className="pt-1 pb-2 text-lg">Dont have an account?</p>
                    <p className="font-medium text-green-900">
                        <Link href={`/auth/sign-up?redirect=${redirect}`}>Sign Up</Link>
                    </p>
                </div>

                {/* Forgot password button */}
                <button className="rounded-2xl bg-green-900 px-4 py-2 text-white hover:bg-green-900">
                    <Link href="/forgot-password">Forgot password?</Link>
                </button>
            </form>
        </AuthLayout>
    )
}
