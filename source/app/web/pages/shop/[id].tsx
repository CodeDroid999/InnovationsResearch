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
    const { bankLogs } = props;
    const pageTitle = router.query?.id
    const user = UserAuth()

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is authenticated when authentication state is loaded
        console.log(`pageTitle: ${pageTitle}`)
        if (!loading) {
            if (user) {
                toast.success("Logged In");
            } else {
                toast.error("Log In to proceed");
                router.push('/auth/sign-in');
            }
        }
    }, [user, pageTitle, loading]);

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
            {bankLogs.length === 0 ? (
                <div className="flex flex-col  md:w-[85vw] w-[80vw] ">
                    <TopNavigation />
                    <table className="row p-2 overflow-x-auto">
                        <thead className="mt-4">
                            <tr>
                                <th className="text-left border-r border-gray-700 md:px-3">Title</th>
                                <th className="text-center border-r border-gray-500 md:px-3">Check Info</th>
                                <th className="text-center border-r border-gray-500 md:px-2">Balance/price</th>
                                <th className="text-center border-r border-gray-500 md:px-3">Status</th>
                                <th className="text-center border-r border-gray-500 md:px-3">Action</th>
                            </tr>
                        </thead>
                    </table>
                    <div className="flex mx-auto align-items-center text-center text-red-500 bg-red-100 py-4 h-[30vh] w-full">
                        No {pageTitle} logs found.
                    </div>
                </div>
            ) : (
                <table className="flex flex-col p-2 overflow-x-auto">
                    <TopNavigation />
                    <thead className="mt-4">
                        <tr>
                            <th className="text-left border-2 border-gray-700 md:px-3">Title</th >
                            <th className="text-center border-r border-gray-500 md:px-3">Check Info</th>
                            <th className="text-center border-r border-gray-500 md:px-2">Balance/price</th>
                            <th className="text-center border-r border-gray-500 md:px-3">Status</th>
                            <th className="text-center border-r border-gray-500 md:px-3">Action</th>
                        </tr >
                    </thead >

                    <tbody className="pt-2 pb-2">
                        {bankLogs.map((bankLog: any, index: number) => (
                            <tr
                                key={bankLog.id}
                                className={index % 2 === 0 ? 'bg-blue-100' : 'bg-white'}
                                style={{ cursor: 'pointer' }}
                            >
                                <td className="px-2 py-1 text-left border-r border-gray-500">{bankLog.title}</td>
                                <td className="tel-2 pt-1xt-center border-r border-gray-500 md:px-3">{bankLog.dueDate}</td>
                                <td className="text-center border-r border-gray-500 md:px-2"><Image src="https://i.postimg.cc/qRdyTsDY/1684852863.jpg" width="150" height="150" alt=""></Image></td>
                                <td className="text-center border-r border-gray-500 md:px-3">{bankLog.budget}</td>
                                <td className="text-center border-r border-gray-500 md:px-3">{bankLog.offers.length}</td>
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
        const pageTitle = router.query?.id; // Set the constant pageTitle
        console.log('Page title is ', pageTitle);

        // Query the Bank_Logs collection, filter by title field equal to pageTitle, and order by createdAt
        const q = query(collection(db, 'Bank_Logs'),
            where('title', '==', pageTitle),
            orderBy('createdAt'));

        // Execute the query and process each document in the result
        const bankLogsSnapshot = await getDocs(q);
        const bankLogs = bankLogsSnapshot.docs.map(doc => doc.data());

        return {
            props: {
                bankLogs: bankLogs,
            },
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);

        return {
            props: {
                bankLogs: [],
            },
        };
    }
}
