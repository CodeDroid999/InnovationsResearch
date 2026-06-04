import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { UserAuth } from "context/AuthContext";
import { db } from "../../firebase";
import { query, collection, orderBy, getDocs, where } from "firebase/firestore";
import router from "next/router";
import toast from "react-hot-toast";
import ClientLayout from 'components/ClientUI/ClientLayout';
import TopNavigation from 'components/ClientUI/top-nav'
import Image from 'next/image'


export const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleString('en-us', { month: 'short' })
    const year = date.getFullYear()
    const suffix =
        day === 1 || day === 21 || day === 31
            ? 'st'
            : day === 2 || day === 22
                ? 'nd'
                : day === 3 || day === 23
                    ? 'rd'
                    : 'th'
    return `${day}${suffix} ${month} ${year}`
}

export default function Shop(props: any) {
    const { payments } = props;
    const userId = router.query?.id
    const user = UserAuth()

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is authenticated when authentication state is loaded
        console.log(`userId: ${userId}`)
        if (!loading) {
            if (user) {
                toast.success("Logged In");
            } else {
                toast.error("Log In to proceed");
                router.push('/auth/sign-in');
            }
        }
    }, [user, userId, loading]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000); // Adjust the timeout as needed

        // Clean up timeout when component unmounts
        return () => clearTimeout(timeout);
    }, []);



    const handlePostTask = () => {
        router.push("/add-balance");
    };

    return (
        <ClientLayout>
            {payments.length === 0 ? (
                <div className="flex flex-col  md:w-[85vw] w-[80vw] ">
                    <TopNavigation />
                    <table className="row p-2 overflow-x-auto">
                        <thead className="mt-4">
                            <tr>
                                <td className="px-2 py-1 text-left border-r border-gray-500">Title</td>
                                <td className="tel-2 pt-1xt-center border-r border-gray-500 md:px-3">Date</td>
                                <td className="text-center border-r border-gray-500 md:px-3">Status</td>
                                <td className="text-center border-r border-gray-500 md:px-3">ID</td>
                            </tr >
                        </thead>
                    </table>
                    <div className="flex flex-col justify-center items-center text-center text-red-500 bg-red-100 py-4 h-[30vh] w-full">
                        <p className="text-center">You have made no payments.</p>
                    </div>

                </div>
            ) : (
                <table className="flex flex-col p-2 overflow-x-auto">
                    <TopNavigation />
                    <thead className="mt-4">
                        <tr>
                            <td className="px-2 py-1 text-left border-r border-gray-500">Title</td>
                            <td className="tel-2 pt-1xt-center border-r border-gray-500 md:px-3">Date</td>
                            <td className="text-center border-r border-gray-500 md:px-3">Status</td>
                            <td className="text-center border-r border-gray-500 md:px-3">ID</td>
                        </tr >
                    </thead >

                    <tbody className="pt-2 pb-2">
                        {payments.map((payment: any, index: number) => (
                            <tr
                                key={payment.id}
                                className={index % 2 === 0 ? 'bg-blue-100' : 'bg-white'}
                                style={{ cursor: 'pointer' }}
                            >
                                <td className="px-2 py-1 text-left border-r border-gray-500">{payment.title}</td>
                                <td className="tel-2 pt-1xt-center border-r border-gray-500 md:px-3">{payment.Date}</td>
                                <td className="text-center border-r border-gray-500 md:px-3">{payment.status}</td>
                                <td className="text-center border-r border-gray-500 md:px-3">{payment.Id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table >
            )
            }
        </ClientLayout >
    );
}


export async function getServerSideProps() {
    try {
        const userId = router.query?.id; // Set the constant userId
        console.log('Page title is ', userId);

        // Query the payments collection, filter by title field equal to userId, and payment by createdAt
        const q = query(collection(db, 'payments'),
            where('title', '==', userId),
            orderBy('createdAt'));

        // Execute the query and process each document in the result
        const PaymentsSnapshot = await getDocs(q);
        const payments = PaymentsSnapshot.docs.map(doc => doc.data());

        return {
            props: {
                payments: payments,
            },
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);

        return {
            props: {
                payments: [],
            },
        };
    }
}
