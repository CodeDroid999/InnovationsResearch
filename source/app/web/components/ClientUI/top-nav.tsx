import { UserAuth } from 'context/AuthContext';
import React, { useContext } from 'react';
import Link from 'next/link';

const TopNavigation = () => {
    return (
        <div className="bg-gray-200 flex justify-between py-2 px-4">
            <div className="float-left">
            </div>
            <div className="float-right flex space-x-2 text-white">
                <div className="px-2 py-1 rounded  shadow bg-gray-600">Balance: $ 0.00</div>
                <div className="px-2 py-1 rounded shadow bg-green-700">
                    <Link href="/bitcoin-three">ADD BAL</Link></div>
            </div>
        </div >
    );
};

export default TopNavigation;
