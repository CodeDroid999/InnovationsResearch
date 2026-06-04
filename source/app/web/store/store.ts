import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Step1 = {
  title: string
  dueDate: string
}

type Step2 = {
  description: string
}

interface Store {
  step1: Step1
  step2: Step2
  setStep1Data: (title: string, dueDate: string) => void
  setStep2Data: (description: string) => void
  clearStore: () => void
}
const useFormStore = create<Store>()(
  persist(
    (set) => ({
      step1: {
        title: '',
        dueDate: '',
      },
      step2: {
        description: '',
        assignmentFilePath: '',
      },
      step3: {
        budget: '',
      },
      setStep1Data: (title, dueDate) =>
        set((state) => ({
          ...state,
          step1: {
            ...state.step1,
            title,
            dueDate,
          },
        })),
      setStep2Data: (description) =>
        set((state) => ({
          ...state,
          step2: {
            ...state.step2,
            description,
            assignmentFilePath: '',
          },
        })),

      clearStore: () =>
        set({
          step1: {
            title: '',
            dueDate: '',
          },
          step2: {
            description: '',
          },
        }),
    }),
    {
      name: 'formStore',
    }
  )
)

export default useFormStore
