import CryptoMarquee from 'components/ClientUI/CryptoMarquee';
import Image from 'next/image';
import React from 'react';

const BitcoinPaymentPage = () => {
    return (
        <div className="flex flex-col bg-gray-100 mx-auto ">
            <h1 className="text-center py-4 text-3xl font-bold mb-4">BITCOIN PAYMENT PAGE</h1>
            <p className="text-center text-lg mb-4">Awaiting Payment From You</p>
            <p className="text-center text-lg mb-4 bg-red-600 text-gray-100 mx-8 p-1 hover:bg-red-800 rounded">Deposit any amount as long as it is avode the minimum required.</p>
            <p className="mb-4 text-center p-1 text-green-600 shadow-2xl">
                NOTE: Balance will be credited into your account after 1-3 Bitcoin confirmations. Kindly send the required amount
                to the address provided below. Please Scan or Copy the address to ensure that you are paying to the correct address
                provided. Pay the required amount.
            </p>
            <div className="mb-4 flex mx-auto">
                <Image src="https://i.postimg.cc/bNksGmyC/crypti-QR-code.jpg" alt="QR Code for payment" width="400" height="400" />
            </div>
            <p className="mb-4 mx-auto text-center">Deposit any amount of your choice so long it is above the minimum required to this address:</p>
            <div className="flex items-center mx-auto my-3">
                <span className="text-green-600 border-2 px-2 py-4 rounded border-gray-500 shadow-2xl font-mono break-all">
                    bc1q30apxnf9qteu68gusnf0lk3kja74vp50ev0ldk
                </span>
            </div>
            <p className="mb-4 text-center">
                After sending to the above address, this page will refresh automatically upon receiving bitcoins.
            </p>
            <p className="mb-4 text-center mx-auto">
                When you get the success message that we have received your money, you can close this page. It will be automatically
                added when it gets one confirmation.
            </p>
            <div className="flex items-center mx-auto my-3">
                <span className="text-green-600 border-2 px-2 py-4 rounded border-gray-100 shadow-2xl font-mono break-all">
                    Loading Payment......
                </span>
            </div>
            <p className="mb-8">
                Once payment reflects on your balance, your order will be processed successfully. Then you will be able to download
                login information to your provided email.
            </p>
            <div className="cryptoMarquee fixed bottom-0 min-w-100">
                <CryptoMarquee />
            </div>
        </div>

    );
};

export default BitcoinPaymentPage;
