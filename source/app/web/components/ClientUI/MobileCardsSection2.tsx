import Link from 'next/link';
import React from 'react';

const CardsSection = () => {
  return (
    <div className="row md:hidden flex bg-teal-800 px-4 py-4 shadow  animate-pulse">

      <br className="hidden sm:flex" />
      <div className="col-md-4 flex animate-pulse flex-col md:py-1 md:pl-2 md:pr-5 py-1 pl-2 pr-5  shadow my-4 border-2 border-gray-200 bg-green-500">
        <Link href="/shop/scotia-bank" className="text-lg font-bold text-white shadow underline">
          Scotia BANK</Link>
        <div className="text-2xl font-bold px-2 text-gray-100">21</div>
        <div className="flex justify-items-between shadow"><span className="text-left text-green-700 font-bold">100% Valid</span><span className="text-gray-100 font-bold pl-3 text-right">CAN</span></div>
        <div className="flex justify-items-between shadow"><span className="text-left text-gray-100">09/02/2024</span><Link href="/shop" className="text-gray-100 font-bold pl-3 text-right">Shop</Link></div>
      </div>
      <div className="col-md-4 flex animate-pulse flex-col md:py-1 md:pl-2 md:pr-5 py-1 pl-2 pr-5  shadow my-4 border-2 border-gray-200 bg-gray-700">
        <Link href="/shop" className="text-lg font-bold text-white shadow underline">
          PNC BANK</Link>
        <div className="text-2xl font-bold px-2 text-gray-100">7</div>
        <div className="flex justify-items-between shadow"><span className="text-left text-green-700 font-bold">100% Valid</span><span className="text-gray-100 font-bold pl-3 text-right">USA</span></div>
        <div className="flex justify-items-between shadow"><span className="text-left text-gray-100">09/02/2024</span><Link href="/shop" className="text-gray-100 font-bold pl-3 text-right">Shop</Link></div>
      </div>
      <div className="col-md-4 flex animate-pulse flex-col md:py-1 md:pl-2 md:pr-5 py-1 pl-2 pr-5  shadow my-4 border-2 border-gray-200">
        <Link href="/shop/cibc-bank" className="text-lg font-bold text-white shadow underline">
          CIBC BANK</Link>
        <div className="text-2xl font-bold px-2 text-gray-100">5</div>
        <div className="flex justify-items-between shadow"><span className="text-left text-green-700 font-bold">100% Valid</span><span className="text-gray-100 font-bold pl-3 text-right">CAN</span></div>
        <div className="flex justify-items-between shadow"><span className="text-left text-gray-100">09/02/2024</span><Link href="/shop" className="text-gray-100 font-bold pl-3 text-right">Shop</Link></div>
      </div>
    </div >
  );
};

export default CardsSection;
