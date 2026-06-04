import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { UserAuth } from "context/AuthContext";
import { db } from "../firebase";
import { query, collection, orderBy, getDocs, where, Timestamp } from "firebase/firestore";
import router from "next/router";
import toast from "react-hot-toast";
import ClientLayout from 'components/ClientUI/ClientLayout';
import TopNavigation from 'components/ClientUI/top-nav'
import Image from 'next/image'
import MethodsTable from 'components/methods/MethodsTable';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';


export const formatDate = (date: string | Timestamp) => {
  const formattedDate = date instanceof Timestamp ? date.toDate() : new Date(date);
  const day = formattedDate.getDate();
  const month = formattedDate.toLocaleString('en-us', { month: 'short' });
  const year = formattedDate.getFullYear();
  const suffix =
    day === 1 || day === 21 || day === 31
      ? 'st'
      : day === 2 || day === 22
        ? 'nd'
        : day === 3 || day === 23
          ? 'rd'
          : 'th';
  return `${day}${suffix} ${month} ${year}`;
};


export default function Shop(props: any) {
  const { methods } = props;
  const userId = router.query?.id
  const user = UserAuth()
  const productId = uuidv4();


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
      {methods.length === 0 ? (
        <div className="flex flex-col  md:w-[85vw] w-[80vw] ">
          <TopNavigation />
          <table className="row p-2 overflow-x-auto">
            <thead className="mt-4">
              <tr>
                <th className="text-left border-r border-gray-700 md:px-3">Product Title</th>
                <th className="text-center border-r border-gray-500 md:px-3">Methods</th>
                <th className="text-center border-r border-gray-500 md:px-2">Price</th>
                <th className="text-center border-r border-gray-500 md:px-3">File</th>
                <th className="text-center border-r border-gray-500 md:px-3">Status</th>
                <th className="text-center border-r border-gray-500 md:px-3">Buy Now</th>

              </tr>
            </thead>
          </table>
          <div className="flex flex-col justify-center items-center text-center text-red-500 bg-red-100 py-4 h-[30vh] w-full">
            <p className="text-center">No methods are available.</p>
          </div>

        </div>
      ) : (
        <div className="flex flex-col p-2 overflow-x-auto md:w-[85vw] w-[80vw] ">
          <TopNavigation />
          <table className="flex flex-col md:w-[85vw] w-[80vw]">
            <tbody className="pt-2 pb-2 md:w-[85vw] w-[80vw]">
              <p className="text-left font-bold text-lg text-blue-900 pb-2">Bank Logs</p>
              {methods.map((method: any, index: number) => (
                <tr
                  key={method.id}
                  className={index % 2 === 0 ? 'bg-blue-100' : 'bg-white'}
                  style={{ cursor: 'pointer' }}
                >

                  <td className="text-left border-r border-gray-700 md:px-4 px-1 md">Method</td>
                  <td className="px-2 py-1 text-left border-r border-gray-500">{method.title}</td>
                  <td className="tel-2 pt-1xt-center border-r border-gray-500 md:px-3">$ {method.price}.00</td>
                  <td className="text-center border-r border-gray-500 md:px-2">
                    <div className="rounded bg-green-500 px-1 py-1 text-center text-white" onClick={() => router.push(method.fileUrl)}>
                      PDF
                    </div>
                  </td>
                  <td className="text-center border-r border-gray-500 md:px-3">{method.status}</td>
                  <td className="text-center border-r border-gray-500 md:px-3">
                    {method.status === "Available" ? (
                      <Link
                        href={`/purchase-product/${method.productId}`}
                        className="text-blue-800 text-center whitespace-nowrap"
                      >
                        Purchase
                      </Link>
                    ) : (
                      <div className="text-blue-800 text-center whitespace-nowrap"
                      >
                        Out of stock!
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div >
      )
      }
    </ClientLayout >
  );
}

export async function getServerSideProps() {
  try {
    const q = query(collection(db, 'Bank_Logs'), orderBy('createdAt'));
    const MethodsSnapshot = await getDocs(q);

    // Convert Firestore Timestamp objects to JavaScript Date objects and format them
    const methods = MethodsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        createdAt: data.createdAt
      };
    });

    return {
      props: {
        methods: methods,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);

    return {
      props: {
        methods: [],
      },
    };
  }
}
