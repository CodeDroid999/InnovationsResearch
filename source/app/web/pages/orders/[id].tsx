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
    const { orders } = props;
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
            {orders.length === 0 ? (
                <div className="flex flex-col  md:w-[85vw] w-[80vw] ">
                    <TopNavigation />
                    <table className="row p-2 overflow-x-auto">
                        <thead className="mt-4">
                            <tr>
                                <th className="text-left border-r border-gray-700 md:px-3">Product Title</th>
                                <th className="text-center border-r border-gray-500 md:px-3">Price</th>
                                <th className="text-center border-r border-gray-500 md:px-2">Balance</th>
                                <th className="text-center border-r border-gray-500 md:px-3">Order ID</th>
                                <th className="text-center border-r border-gray-500 md:px-3">Payment Status</th>
                                <th className="text-center border-r border-gray-500 md:px-3">Delivery Status</th>
                                <th className="text-center border-r border-gray-500 md:px-3">Action</th>

                            </tr>
                        </thead>
                    </table>
                    <div className="flex flex-col justify-center items-center text-center text-red-500 bg-red-100 py-4 h-[30vh] w-full">
                        <p className="text-center">You have no orders.</p>
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
                        {orders.map((order: any, index: number) => (
                            <tr
                                key={order.id}
                                className={index % 2 === 0 ? 'bg-blue-100' : 'bg-white'}
                                style={{ cursor: 'pointer' }}
                            >
                                <td className="px-2 py-1 text-left border-r border-gray-500">{order.title}</td>
                                <td className="tel-2 pt-1xt-center border-r border-gray-500 md:px-3">{order.dueDate}</td>
                                <td className="text-center border-r border-gray-500 md:px-2"><Image src="https://i.postimg.cc/qRdyTsDY/1684852863.jpg" width="150" height="150" alt=""></Image></td>
                                <td className="text-center border-r border-gray-500 md:px-3">{order.budget}</td>
                                <td className="text-center border-r border-gray-500 md:px-3">{order.offers.length}</td>
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

        // Query the Orders collection, filter by title field equal to userId, and order by createdAt
        const q = query(collection(db, 'Orders'),
            where('title', '==', userId),
            orderBy('createdAt'));

        // Execute the query and process each document in the result
        const OrdersSnapshot = await getDocs(q);
        const orders = OrdersSnapshot.docs.map(doc => doc.data());

        return {
            props: {
                orders: orders,
            },
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);

        return {
            props: {
                orders: [],
            },
        };
    }
}
