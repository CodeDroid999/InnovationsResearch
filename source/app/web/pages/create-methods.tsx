import ClientLayout from 'components/ClientUI/ClientLayout'
import TopNavigation from 'components/ClientUI/top-nav'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { TfiClose, TfiPlus } from 'react-icons/tfi'
import Select from 'react-select';

import { auth, db } from '../firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import toast from 'react-hot-toast'
import MethodsTitleList from 'components/CreateProduct/ProductConfig/MethodsTitleList'

export default function CreateProduct() {
    const [title, setTitle] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [fileUrl, setFileUrl] = useState<string>('');

    // Error Validation
    const [titleError, setTitleError] = useState<string>('');
    const [priceError, setPriceError] = useState<string>('');
    const [fileUrlError, setFileUrlError] = useState<string>('');

    const [selectedOption, setSelectedOption] = useState<{ label: string; value: string } | null>(null);
    const options = useMemo(() => MethodsTitleList.map(type => ({ label: type, value: type })), []);

    const handleTitleChange = (selectedOption: { label: string; value: string } | null) => {
        setSelectedOption(selectedOption);
        if (selectedOption) {
            setTitle(selectedOption.value);
        } else {
            setTitle('');
        }
    };

    const handlePriceChange = (price: string) => {
        setPrice(price);
    };

    const currentDate = new Date().toISOString().split('T')[0]
    const router = useRouter()

    useEffect(() => {
        console.log('User Input Data:');
        console.log('Method Title:', title);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push(`/auth/sign-in?redirect=/create-product`)
            }
        })
        return () => unsubscribe()
    }, [router, title])

    const handleExit = () => {
        router.push('/')
    }

    const handleCreateMethod = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let hasError = false;

        if (!title) {
            setTitleError('* This field is required');
            hasError = true;
        } else {
            setTitleError('');
        }

        if (!price) {
            setPriceError('* This field is required');
            hasError = true;
        } else {
            setPriceError('');
        }

        if (!fileUrl) {
            setFileUrlError('* This field is required');
            hasError = true;
        } else {
            setFileUrlError('');
        }

        if (hasError) {
            return;
        }

        const docRef = await addDoc(collection(db, 'Methods'), {
            title: title,
            price: price,
            status: 'Available',
            fileUrl: fileUrl,
            createdAt: serverTimestamp(),
            paymentReleased: false,
        });

        const methodId = docRef.id;

        await addDoc(collection(db, 'mail'), {
            to: 'johnmwegah@gmail.com',
            message: {
                subject: 'New Product',
                html: `A new Product has been posted`,
            },
        });
        router.push("/methods");
        toast.success('Method has been posted');
    }

    return (
        <>
            <TopNavigation />
            <header className="flex justify-end bg-gray-100 py-2">
                <div className="cursor-pointer bg-red-400 flex rounded shadow-xl p-2" onClick={handleExit}>
                    <span className="text-gray-100 px-2">Cancel</span><TfiClose size={18} className="mt-1 font-semibold text-gray-100" />
                </div>
            </header>
            <div className="w-full px-4 py-2">
                <div className="p-3 shadow-2xl rounded-lg">
                    <p className="mb-2 text-lg font-medium text-gray-700">
                        Create a Method <TfiPlus size={22} className="font-semibold text-gray-100" />
                    </p>
                    <form className="mt-6 flex flex-col gap-4 md:mt-8" onSubmit={handleCreateMethod}>
                        <div className="flex flex-col">
                            <label htmlFor="title" className="mb-1 text-xs font-medium text-green-950 md:text-sm">
                                Title
                            </label>
                            <Select
                                value={selectedOption}
                                onChange={handleTitleChange}
                                options={options}
                                placeholder="Select Title"
                            />
                            {titleError && <span className="text-red-500 mt-1 bg-red-100 p-1">{titleError}</span>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="price" className="mb-1 text-xs font-medium text-green-950 md:text-sm">
                                Price
                            </label>
                            <input
                                type="text"
                                value={price}
                                onChange={(e) => handlePriceChange(e.target.value)}
                                className={`text-gray-500 py-1 rounded-lg border-1 bg-white px-2 outline-none focus:border-blue-500`}
                                placeholder="Enter Price"
                            />
                            {priceError && <span className="text-red-500 mt-1 bg-red-100 p-1">{priceError}</span>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="fileUrl" className="mb-1 text-xs font-medium text-green-950 md:text-sm">
                                PDF File Url <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={fileUrl}
                                onChange={(e) => setFileUrl(e.target.value)}
                                className={`text-gray-500 py-1 rounded-lg border-1 bg-white px-2 outline-none focus:border-blue-500`}
                                placeholder="Enter PDF File Url"
                            />
                            {fileUrlError && <span className="text-red-500 mt-1 bg-red-100 p-1">{fileUrlError}</span>}
                        </div>
                        <button className="rounded-xl bg-green-500 py-2 text-center text-white" type="submit">
                            Create Method
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
