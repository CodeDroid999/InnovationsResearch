import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Crypto = () => {
  return (
    <div className="row">
      <div className="col-md-1">
        <Image src="https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png" alt="bitcoin" />
        <span>Bitcoin <span>(BTC)</span></span>
        <span>66075.2</span>
      </div>
      {/* Duplicate items removed */}
    </div>
  );
};

export default Crypto;
