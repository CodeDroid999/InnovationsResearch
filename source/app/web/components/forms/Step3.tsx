import { UserAuth } from 'context/AuthContext'
import { db } from '../../firebase'
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { BsCurrencyDollar } from 'react-icons/bs'
import useFormStore from 'store/store'
import toast from 'react-hot-toast'

interface Props {
  handlePreviousStep: () => void
}

export default function Step3({ handlePreviousStep }: Props) {
  const [budget, setBudget] = useState('')
  const [budgetError, setBudgetError] = useState('')
  const { user } = UserAuth()

  const step1 = useFormStore((state) => state.step1)
  const step2 = useFormStore((state) => state.step2)

  const { title, dueDate } = step1
  const { description } = step2
  const userId = user.userId

  const router = useRouter()

  const handleNext = async (event: any) => {
    event.preventDefault()
    let hasError = false
    if (!budget) {
      setBudgetError('* This field is required')
      hasError = true
    } else {
      const budgetValue = Number(budget)
      if (isNaN(budgetValue) || budgetValue < 5 || budgetValue > 9999) {
        setBudgetError('The price must be between $5 and $9999')
        hasError = true
      } else {
        setBudgetError('')
      }
    }

    if (hasError) {
      return
    }

    const docRef = await addDoc(collection(db, 'assignments'), {
      title: title,
      description: description,
      dueDate: dueDate,
      budget: budget,
      status: 'Open',
      createdAt: serverTimestamp(),
      student: {
        userId: userId,
        price: '',
        bookingFee: '',
        finalPrice: '',
      },
      tutor: {
        userId: '',
        price: '',
        serviceFee: '',
        finalPrice: '',
        proposal: '',
      },
      userId: userId,
      paymentRequested: false,
      paymentReleased: false,
      studentReview: false,
      tutorReview: false,
    })

    const assignmentId = docRef.id
    await addDoc(collection(db, 'mail'), {
      to: 'airtaska1@gmail.com',
      message: {
        subject: 'New Assignment',
        html: `A new assignment has been posted`,
      },
    })

    toast.success('Assignmemt has been posted')

    router.push(`/assignment/${assignmentId}`)
  }

  const handlePrevious = () => {
    handlePreviousStep()
  }
  return (
    <div className="w-full">
      <p className="mb-1 text-xs font-medium uppercase text-green-950 md:text-sm">
        Step 3/3
      </p>
      <p className="text-3xl font-bold text-green-950">Suggest your budget</p>
      <form className="mt-6 flex flex-col gap-4 md:mt-8">
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="mb-2 text-lg font-medium text-gray-700"
          >
            What is your budget?
          </label>
          <div className="relative flex flex-row items-center">
            <BsCurrencyDollar
              size={20}
              className="absolute left-0 mx-1 text-green-950 "
            />
            <input
              placeholder="Enter budget"
              onChange={(e) => setBudget(e.target.value)}
              className={`h-full w-full rounded-lg border-1bg-gray-50 py-4 pl-8
          font-medium outline-none focus:border-blue-500`}
            />
          </div>

          {budgetError && <span className="text-red-500">{budgetError}</span>}
        </div>
        <div className="mt-10 flex flex-row space-x-3 font-semibold">
          <button
            className="flex-1 rounded-xl bg-blue-100 py-2 text-center text-blue-800"
            onClick={handlePrevious}
          >
            Back
          </button>
          <button
            className="flex-1 rounded-xl bg-green-900 py-2 text-center text-white"
            onClick={handleNext}
          >
            Post assignment
          </button>
        </div>
      </form>
    </div>
  )
}
