import ClientLayout from 'components/ClientUI/ClientLayout'
import TopNavigation from 'components/ClientUI/top-nav'
import GenderSelector from 'components/CreateProduct/GenderSelector'
import ProductAccountTypeSelector from 'components/CreateProduct/ProductAccountTypeSelector'
import ProductTitleSelector from 'components/CreateProduct/ProductTitleSelector'
import ProductTypeSelector from 'components/CreateProduct/ProductTypeSelector'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { TfiClose, TfiPlus } from 'react-icons/tfi'
import { v4 as uuidv4 } from 'uuid';


import { auth, db } from '../firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { description } from 'lib/demo.data'
import toast from 'react-hot-toast'

export default function CreateProduct() {


    const [accountNumber, setAccountNumber] = useState('')
    const [productType, setProductType] = useState<string>('');
    const [productTitle, setProductTitle] = useState<string>('');
    const [DoB, setDoB] = useState('')
    const [productAccountType, setProductAccountType] = useState('');
    const [firstName, setFirstName] = useState('')
    const [genderType, setGenderType] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [carrier, setCarrier] = useState('')
    const [email, setEmail] = useState('')
    const [productUserId, setProductUserId] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [productBalance, setProductBalance] = useState('')
    const [RoutingNumber, setRoutingNumber] = useState('')

    const productId = uuidv4();


    {/** Error Validation **/ }
    const [accountNumberError, setAccountNumberError] = useState('')
    const [DoBError, setDoBError] = useState('')
    const [productTypeError, setProductTypeError] = useState('');
    const [productTitleError, setProductTitleError] = useState('');
    const [productAccountTypeError, setProductAccountTypeError] = useState('');
    const [firstNameError, setFirstNameError] = useState('')
    const [genderTypeError, setGenderTypeError] = useState('')
    const [cityError, setCityError] = useState('')
    const [stateError, setStateError] = useState('')
    const [carrierError, setCarrierError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [productUserIdError, setProductUserIdError] = useState('')
    const [phoneNumberError, setPhoneNumberError] = useState('')
    const [productBalanceError, setProductBalanceError] = useState('')
    const [RoutingNumberError, setRoutingNumberError] = useState('')



    const handleProductTitleChange = (selectedProductTitle: string) => {
        setProductTitle(selectedProductTitle);
    };



    const handleProductTypeChange = (selectedProductType: string) => {
        setProductType(selectedProductType);
        setProductTitle(''); // Reset product title when product type changes
    };




    const handleCreateBankLog = async (event: any) => {
        console.log("handleCreateBankLog");
        event.preventDefault()
        let hasError = false
        if (productType === '') {
            setProductTypeError('* This field is required')
            hasError = true
        } else {
            setProductTypeError('')
        }
        if (city === '') {
            setCityError('* This field is required')
            hasError = true
        } else {
            setCityError('')
        }
        if (state === '') {
            setStateError('* This field is required')
            hasError = true
        } else {
            setStateError('')
        }
        if (phoneNumber === '') {
            setPhoneNumberError('* This field is required')
            hasError = true
        } else {
            setPhoneNumberError('')
        }
        if (firstName === '') {
            setFirstNameError('* This field is required')
            hasError = true
        } else {
            setFirstNameError('')
        }
        if (productTitle === '') {
            setProductTitleError('* This field is required')
            hasError = true
        } else {
            setProductTitleError('')
        }

        if (productAccountType === '') {
            setProductAccountTypeError('* This field is required')
            hasError = true
        } else {
            setProductAccountTypeError('')
        }
        if (!accountNumber) {
            setAccountNumberError('* This field is required')
            hasError = true
        } else {
            setAccountNumberError('')
        }
        if (genderType === '') {
            setGenderTypeError('* This field is required')
            hasError = true
        } else {
            setGenderTypeError('')
        }
        if (!productTitle) {
            setProductTitleError('* This field is required')
            hasError = true
        } else {
            setProductTitleError('')
        }

        if (!DoB) {
            setDoBError('* This field is required')
            hasError = true
        } else {
            setDoBError('')
        }
        if (!email) {
            setEmailError('* This field is required')
            hasError = true
        } else {
            setEmailError('')
        }
        if (!carrier) {
            setCarrierError('* This field is required')
            hasError = true
        } else {
            setEmailError('')
        }
        if (productBalance === '') {
            setProductBalanceError('* This field is required')
            hasError = true
        } else {
            setProductBalanceError('')
        }
        if (RoutingNumber === '') {
            setRoutingNumberError('* This field is required')
            hasError = true
        } else {
            setRoutingNumberError('')
        }
        if (hasError) {
            return
        }
        addDoc(collection(db, 'Bank_Logs'), {
            type: productType,
            title: productTitle,
            firstName: firstName,
            accountType: productAccountType,
            accountNumber: accountNumber,
            gender: genderType,
            DoB: DoB,
            phoneNumber: phoneNumber,
            city: city,
            email: email,
            state: state,
            carrier: carrier,
            RoutingNumber: RoutingNumber,
            Instock: 'Available',
            previewPicUrl: '',
            createdAt: serverTimestamp(),
            paymentReleased: false,
            productId: productId
        })


        await addDoc(collection(db, 'mail'), {
            to: 'johnmwegah@gmail.com',
            message: {
                subject: 'New Product',
                html: `A new Product has been posted`,
            },
        })

        toast.success('Bank Log has been posted')
        router.push("/methods");
    }


    const handleCreateDarkLog = async (event: any) => {
        console.log("handleCreateDarkLog");
        event.preventDefault()
        let hasError = false
        if (productType === '') {
            setProductTypeError('* This field is required')
            hasError = true
        } else {
            setProductTypeError('')
        }
        if (productTitle === '') {
            setProductTitleError('* This field is required')
            hasError = true
        } else {
            setProductTitleError('')
        }
        if (productAccountType === '') {
            setProductAccountTypeError('* This field is required')
            hasError = true
        } else {
            setProductAccountTypeError('')
        }
        if (!accountNumber) {
            setAccountNumberError('* This field is required')
            hasError = true
        } else {
            setAccountNumberError('')
        }
        if (productUserId === '') {
            setProductUserIdError('* This field is required')
            hasError = true
        } else {
            setProductUserIdError('')
        }

        if (genderType === '') {
            setGenderTypeError('* This field is required')
            hasError = true
        } else {
            setGenderTypeError('')
        }
        if (!state) {
            setStateError('* This field is required')
            hasError = true
        } else {
            setStateError('')
        }
        if (!DoB) {
            setDoBError('* This field is required')
            hasError = true
        } else {
            setDoBError('')
        }
        if (productBalance === '') {
            setProductBalanceError('* This field is required')
            hasError = true
        } else {
            setProductBalanceError('')
        }
        if (RoutingNumber === '') {
            setRoutingNumberError('* This field is required')
            hasError = true
        } else {
            setRoutingNumberError('')
        }
        if (hasError) {
            return
        }

        addDoc(collection(db, 'Dark_Logs'), {
            title: productTitle,
            accountType: productAccountType,
            RoutingNumber: RoutingNumber,
            Instock: 'Available',
            previewPicUrl: '',
            createdAt: serverTimestamp(),
            paymentReleased: false,
            productId: productId
        })



        await addDoc(collection(db, 'mail'), {
            to: 'johnmwegah@gmail.com',
            message: {
                subject: 'New Product',
                html: `A new Product has been posted`,
            },
        })

        toast.success('Dark Log has been posted')

        router.push("/shop")
    }


    const currentDate = new Date().toISOString().split('T')[0]

    const router = useRouter()

    useEffect(() => {
        console.log('User Input Data:');
        console.log('Product Type:', productType);
        console.log('Product Title:', productTitle);
        console.log('Product Account Type:', productAccountType);
        console.log('First Name:', firstName);
        console.log('Gender Type:', genderType);
        console.log('Date of Birth:', DoB);
        console.log('City:', city);
        console.log('State:', state);
        console.log('Carrier:', carrier);
        console.log('Email:', email);
        console.log('Product UserId:', productUserId);
        console.log('Phone Number:', phoneNumber);
        console.log('Product Balance:', productBalance);
        console.log('Routing Number:', RoutingNumber);
        console.log('Product Type:', productType);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push(`/auth/sign-in?redirect=/create-product`)
            }
        })
        return () => unsubscribe()
    }, [router, productType, DoB, RoutingNumber, carrier, city, email, firstName, genderType,
        phoneNumber, productAccountType, productBalance, productTitle, productUserId, state])





    const handleExit = () => {
        router.push('/')
    }
    return (
        <>
            <TopNavigation />
            <header className="flex flex-row  justify-end bg-gray-100  py-2 ">
                <div className="cursor-pointer bg-red-400 flex rounded shadow-xl p-2" onClick={handleExit}>
                    <span className="text-gray-100 px-2">Cancel</span><TfiClose size={18} className="mt-1 font-semibold text-gray-100" />
                </div>
            </header>
            <div className="w-full px-4 py-2">
                <div className="p-3 shadow-2xl rounded-lg">
                    <p className="mb-2 text-lg font-medium text-gray-700">
                        Create a product <TfiPlus size={22} className="font-semibold text-gray-100" />
                    </p>
                    <form className="mt-6 flex flex-col gap-4 md:mt-8">
                        <div className="flex flex-col">
                            <label
                                htmlFor="title"
                                className="mb-1 text-xs font-medium  text-green-950 md:text-sm "
                            >
                                Type
                            </label>

                            <ProductTypeSelector productType={productType} setProductType={setProductType} />
                            {productTypeError && <span className="text-red-500 mt-1 bg-red-100 p-1">{productTypeError}</span>}
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="title"
                                className="mb-1 text-xs font-medium  text-green-950 md:text-sm "
                            >
                                Title
                            </label>
                            <ProductTitleSelector productType={productType} value={productTitle} onChange={handleProductTitleChange} />
                            {productTitleError && <span className="text-red-500 mt-1 bg-red-100 p-1">{productTitleError}</span>}
                        </div>
                        {productType === "Darklogs" ? (
                            <>
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="title"
                                        className="mb-1 text-xs font-medium  text-green-950 md:text-sm "
                                    >
                                        Account Type
                                    </label>

                                    <ProductAccountTypeSelector productAccountType={productAccountType} setProductAccountType={setProductAccountType} />
                                    {productAccountTypeError && <span className="text-red-500 mt-1 bg-red-100 p-1">{productAccountTypeError}</span>}
                                </div>
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="title"
                                        className="mb-1 text-xs font-medium  text-green-950 md:text-sm "
                                    >
                                        UserId
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter UserId the account"
                                        onChange={(e) => setProductUserId(e.target.value)}
                                        className={`text-gray-500 py-1 rounded-lg border-1 bg-white px-2 outline-none focus:border-blue-500`}
                                    />
                                    {productUserIdError && <span className="text-red-500 mt-1 bg-red-100 p-1">{productUserIdError}</span>}
                                </div>
                            </>

                        ) : (
                            <>
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="title"
                                        className="mb-1 text-xs font-medium  text-green-950 md:text-sm "
                                    >
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Firstname"
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className={`text-gray-500 py-1 rounded-lg border-1 bg-white px-2 outline-none focus:border-blue-500`}
                                    />
                                    {firstNameError && <span className="text-red-500 mt-1 bg-red-100 p-1">{firstNameError}</span>}
                                </div>
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="title"
                                        className="mb-1 text-xs font-medium  text-green-950 md:text-sm "
                                    >
                                        Date of Birth</label>
                                    <input
                                        type="date"
                                        placeholder="Enter date"
                                        max={currentDate}
                                        onChange={(e) => setDoB(e.target.value)}
                                        className={`text-gray-500 py-1 rounded-lg border-1 bg-gray-50 px-2 font-medium outline-none focus:border-blue-500`}
                                    />
                                    {DoBError && <span className="text-red-500 mt-1 bg-red-100 p-1">{DoBError}</span>}
                                </div>
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="title"
                                        className="mb-1 text-xs font-medium  text-green-950 md:text-sm "
                                    >
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter City"
                                        onChange={(e) => setCity(e.target.value)}
                                        className={`text-gray-500 py-1 rounded-lg border-1 bg-white px-2 outline-none focus:border-blue-500`}
                                    />
                                    {cityError && <span className="text-red-500 mt-1 bg-red-100 p-1">{cityError}</span>}
                                </div>
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="title"
                                        className="mb-1 text-xs font-medium  text-green-950 md:text-sm "
                                    >
                                        Carrier
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Carrier"
                                        onChange={(e) => setCarrier(e.target.value)}
                                        className={`text-gray-500 py-1 rounded-lg border-1 bg-white px-2 outline-none focus:border-blue-500`}
                                    />
                                    {carrierError && <span className="text-red-500 mt-1 bg-red-100 p-1">{carrierError}</span>}
                                </div>
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="title"
                                        className="mb-1 text-xs font-medium  text-green-950 md:text-sm "
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={`text-gray-500 py-1 rounded-lg border-1 bg-white px-2 outline-none focus:border-blue-500`}
                                    />
                                    {emailError && <span className="text-red-500 mt-1 bg-red-100 p-1">{emailError}</span>}
                                </div>
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="title"
                                        className="mb-1 text-xs font-medium  text-green-950 md:text-sm "
                                    >
                                        PhoneNumber
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Phone Number"
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className={`text-gray-500 py-1 rounded-lg border-1 bg-white px-2 outline-none focus:border-blue-500`}
                                    />
                                    {phoneNumberError && <span className="text-red-500 mt-1 bg-red-100 p-1">{phoneNumberError}</span>}
                                </div>
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="title"
                                        className="mb-1 text-xs font-medium  text-green-950 md:text-sm "
                                    >
                                        Account Number
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Account Number"
                                        onChange={(e) => setAccountNumber(e.target.value)}
                                        className={`text-gray-500 py-1 rounded-lg border-1 bg-white px-2 outline-none focus:border-blue-500`}
                                    />
                                    {accountNumberError && <span className="text-red-500 mt-1 bg-red-100 p-1">{accountNumberError}</span>}
                                </div>
                            </>

                        )}


                        <div className="flex flex-col">
                            <label
                                htmlFor="title"
                                className="mb-1 text-xs font-medium  text-green-950 md:text-sm "
                            >
                                Gender                                </label>

                            <GenderSelector genderType={genderType} setGenderType={setGenderType} />
                            {genderTypeError && <span className="text-red-500 mt-1 bg-red-100 p-1">{genderTypeError}</span>}

                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="title"
                                className="mb-1 text-xs font-medium  text-green-950 md:text-sm "
                            >
                                State/Country
                            </label>
                            <input
                                type="text"
                                placeholder="Enter State"
                                onChange={(e) => setState(e.target.value)}
                                className={`text-gray-500 py-1 rounded-lg border-1 bg-white px-2 outline-none focus:border-blue-500`}
                            />
                            {stateError && <span className="text-red-500 mt-1 bg-red-100 p-1">{stateError}</span>}
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="title"
                                className="mb-1 text-xs font-medium  text-green-950 md:text-sm "
                            >
                                Balance
                            </label>

                            <input
                                type="text"
                                placeholder="Enter Account Balance"
                                onChange={(e) => setProductBalance(e.target.value)}
                                className={`text-gray-500 py-1 rounded-lg border-1 bg-white px-2 outline-none focus:border-blue-500`}
                            />
                            {productBalanceError && <span className="text-red-500 mt-1 bg-red-100 p-1">{productBalanceError}</span>}
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="title"
                                className="mb-1 text-xs font-medium  text-green-950 md:text-sm "
                            >
                                Routing Number
                            </label>

                            <input
                                type="text"
                                placeholder="Enter Routing Number"
                                onChange={(e) => setRoutingNumber(e.target.value)}
                                className={`text-gray-500 py-1 rounded-lg border-1 bg-white px-2 outline-none focus:border-blue-500`}
                            />
                            {RoutingNumberError && <span className="text-red-500 mt-1 bg-red-100 p-1">{RoutingNumberError}</span>}
                        </div>
                        <div className="mt-10 flex flex-row space-x-3 font-semibold">
                            {productType === "Darklogs" ? (
                                <button
                                    className="flex-1 rounded-xl bg-green-500 py-2 text-center text-white"
                                    onClick={handleCreateDarkLog}
                                >
                                    Create DarkLog
                                </button>
                            ) : (
                                <button
                                    className="flex-1 rounded-xl bg-green-500 py-2 text-center text-white"
                                    onClick={handleCreateBankLog}
                                >
                                    Create BankLog
                                </button>
                            )}
                        </div>



                    </form >
                </div >
            </div >
        </>

    )
}
