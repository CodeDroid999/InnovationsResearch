import ClientLayout from "components/ClientUI/ClientLayout"
import TopNavigation from "components/ClientUI/top-nav"
import { UserAuth } from "context/AuthContext"
import { onAuthStateChanged } from "firebase/auth"
import { query, collection, where, getDocs, doc, updateDoc } from "firebase/firestore"
import { uploadBytes, getDownloadURL, ref } from "firebase/storage"
import { DragEvent, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FiEdit2 } from "react-icons/fi"
import { TfiClose, TfiTicket } from "react-icons/tfi"
import { auth, db, storage } from '../../firebase'
import router, { useRouter } from "next/router"
import Image from "next/image"

export default function CreateProduct() {
    const { user } = UserAuth()
    const [uploading, setUploading] = useState(false)
    const router = useRouter()
    const routerId = router.query.id
    const [files, setFiles] = useState({ front: null, back: null });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push(`/auth/sign-in?redirect=/create-product`)
            }
        })
        return () => unsubscribe()
    }, [router])

    const handleDrop = (e, side) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        setFiles((prevFiles) => ({ ...prevFiles, [side]: droppedFile }));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleUpload = async (event: any) => {
        const selectedFile = event.target.files[0]

        if (!selectedFile) return

        setUploading(true)

        const storageRef = ref(storage, `previewPictures/${routerId}`)
        await uploadBytes(storageRef, selectedFile)

        const downloadURL = await getDownloadURL(storageRef)
        const q = query(collection(db, 'users'), where('userId', '==', user.userId))
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
            const docSnapshot = querySnapshot.docs[0]
            const userDocRef = doc(db, 'users', docSnapshot.id)
            await updateDoc(userDocRef, {
                profilePicture: downloadURL,
            })
        }

        setUploading(false)
        toast.success('Picture uploaded')
    }

    const handleExit = () => {
        router.push('/')
    }



    return (
        <ClientLayout>
            <TopNavigation />
            <div className="mx-auto w-full max-w-[1200px] px-3 bg-gray-200">
                <header className="flex flex-row justify-end bg-gray-100 py-2 ">
                    <div className="cursor-pointer bg-red-400 flex rounded shadow-xl p-2" onClick={handleExit}>
                        <span className="text-gray-100 px-2">Cancel</span><TfiClose size={18} className="mt-1 font-semibold text-gray-100" />
                    </div>
                </header>
                <div className="mx-auto mt-10 max-w-[800px] bg-gray-100">
                    <div className="w-full">
                        <div className="p-3 shadow-lg rounded-lg">
                            <p className="mb-2 text-lg font-medium text-gray-700">
                                Create a product +
                            </p>
                            <form className="mt-6 flex flex-col gap-4 md:mt-8">
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="title"
                                        className="mb-1 text-xs font-medium text-green-950 md:text-sm "
                                    >
                                        Preview Photos
                                    </label>

                                    <label htmlFor="profilePicInput" className="p-1 font-semibold ">
                                        {uploading ? (
                                            <div
                                                className="drop-container h-40 flex flex-col align-center items-center justify-center rounded-md bg-gray-100 border-dashed border-2 border-sky-500 "
                                                onDrop={(e) => handleDrop(e, 'back')}
                                                onDragOver={handleDragOver}
                                            >
                                                <div className="flex">
                                                    <p className="text-black text-center pt-1 pb-1">Uploading files</p>
                                                </div>

                                            </div>
                                        ) : (
                                            <div
                                                className="drop-container h-40 flex flex-col align-center items-center justify-center rounded-md bg-gray-100 border-dashed border-2 border-sky-500 "
                                                onDrop={(e) => handleDrop(e, 'back')}
                                                onDragOver={handleDragOver}
                                            >
                                                <div className="flex">
                                                    <p className="text-black text-center pt-1 pb-1">Drop/Drag files</p>
                                                </div>
                                                <div className="flex">
                                                    <p className="text-black text-lg font-bold text-center pt-1 pb-1">OR</p>
                                                </div>
                                                <div className="flex items-center  rounded bg-gray-400 px-2 py-4 font-bold text-gray-900 space-x-2 shadow-lg    hover:text-blue-800 ">
                                                    <FiEdit2 />
                                                    <span className="whitespace-nowrap text-xs ">Upload Preview Picture</span>
                                                    <input
                                                        id="profilePicInput"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleUpload}
                                                        disabled={uploading}
                                                        className="hidden"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex float-right mt-2">
                                            <div className="cursor-pointer bg-green-700 rounded shadow-xl p-2" onClick={handleExit}>
                                                <span className="text-gray-100 px-2">Done</span>
                                                <span className="mt-1 font-extrabold text-gray-100">✓</span>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </form >

                        </div>
                    </div>
                </div>
            </div>
        </ClientLayout >
    );
}
