import Link from 'next/link';
import React from 'react';

const MobileCardsSection1 = () => {
  return (
    <div className="row md:hidden bg-teal-800 px-4 py-4 shadow flex ">
      <div className="col-md-4 flex animate-pulse flex-col md:py-1 md:pl-2 md:pr-5 py-1 pl-2 pr-5  shadow my-4 border-2 border-gray-200 bg-blue-400">
        <Link href="/shop/chase-bank" className="text-lg font-bold text-white shadow underline">
          Chase BANK</Link>
        <div className="text-2xl font-bold px-2 text-gray-100">14</div>
        <div className="flex justify-items-between shadow"><span className="text-left text-green-700 font-bold">100% Valid</span><span className="text-gray-100 font-bold pl-3 text-right">USA</span></div>
        <div className="flex justify-items-between shadow"><span className="text-left text-gray-100">09/02/2024</span><Link href="/shop" className="text-gray-100 font-bold pl-3 text-right">Shop</Link></div>
      </div>
      <div className="col-md-4 flex animate-pulse flex-col md:py-1 md:pl-2 md:pr-5 py-1 pl-2 pr-5  shadow my-4 border-2 border-gray-200 bg-yellow-500">
        <Link href="/shop/pnc-bank" className="text-lg font-bold text-white shadow underline">
          PNC BANK</Link>
        <div className="text-2xl font-bold px-2 text-gray-100">1</div>
        <div className="flex justify-items-between shadow"><span className="text-left text-green-700 font-bold">100% Valid</span><span className="text-gray-100 font-bold pl-3 text-right">USA</span></div>
        <div className="flex justify-items-between shadow"><span className="text-left text-gray-100">09/02/2024</span><Link href="/shop" className="text-gray-100 font-bold pl-3 text-right">Shop</Link></div>
      </div>
      <div className="col-md-4 flex animate-pulse flex-col md:py-1 md:pl-2 md:pr-5 py-1 pl-2 pr-5  shadow my-4 border-2 border-gray-200 bg-red-500">
        <Link href="/shop/boa-bank" className="text-lg font-bold text-white shadow underline">
          BOA BANK</Link>
        <div className="text-2xl font-bold px-2 text-gray-100">19</div>
        <div className="flex justify-items-between shadow"><span className="text-left text-green-700 font-bold">100% Valid</span><span className="text-gray-100 font-bold pl-3 text-right">USA</span></div>
        <div className="flex justify-items-between shadow"><span className="text-left text-gray-100">09/02/2024</span><Link href="/shop" className="text-gray-100 font-bold pl-3 text-right">Shop</Link></div>
      </div>

    </div >
  );
};

export default MobileCardsSection1;
