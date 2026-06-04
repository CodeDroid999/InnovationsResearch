import Image from 'next/image';
import React from 'react';
import Marquee from 'react-fast-marquee';

const CryptoMarquee = () => {
  return (
    <Marquee
      direction="left"
      speed={90}
      gradient={true}
      gradientColor="green"
      gradientWidth={50}
      loop={0}
    >
      <div className="flex space-x-1 bg-green-800 px-1 py-2  border-gray-100 border-r ">
        <Image src="https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png" width="20" height="20" layout="fixed"
          alt=" Crypto Currency Exhange" />
        <span className="text-white">Bitcoin (BTC)</span>
        <span className="mr-1">$ 66, 075.2</span>
      </div>
      <div className="flex space-x-1 bg-green-800 px-1 py-2  border-gray-100 border-r ">
        <Image src="https://assets.coingecko.com/coins/images/279/standard/ethereum.png" width="20" height="20" layout="fixed"
          alt=" Crypto Currency Exhange" />
        <span className="text-white">Ethereum (ETH)</span>
        <span>$ 1,757.21</span>
      </div>
      <div className="flex space-x-1 bg-green-800 px-1 py-2  border-gray-100 border-r ">
        <Image src="https://assets.coingecko.com/coins/images/325/thumb/Tether.png" width="20" height="20" layout="fixed"
          alt=" Crypto Currency Exhange" />
        <span className="text-white">Tether (USDT)</span>
        <span>$ 1.00</span>
      </div>
      <div className="flex space-x-1 bg-green-800 px-1 py-2  border-gray-100 border-r ">
        <Image src="https://assets.coingecko.com/coins/images/825/standard/bnb-icon2_2x.png" width="20" height="20" layout="fixed"
          alt=" Crypto Currency Exhange" />
        <span className="text-white">BNB (BNB)</span>
        <span className="text">$6, 6075.2</span>
      </div>
      <div className="flex space-x-1 bg-green-800 px-1 py-2  border-gray-100 border-r ">
        <Image src="https://assets.coingecko.com/coins/images/4128/standard/solana.png" width="20" height="20" layout="fixed"
          alt=" Crypto Currency Exhange" />
        <span className="text-white">Solana (SOL)</span>
        <span className="text">$ 139.08</span>
      </div>
      <div className="flex space-x-1 bg-green-800 px-1 py-2  border-gray-100 border-r ">
        <Image src="https://assets.coingecko.com/coins/images/13442/standard/steth_logo.png" width="20" height="20" layout="fixed"
          alt=" Crypto Currency Exhange" />
        <span className="text-white">STETH (BTC)</span>
        <span className="text">$ 3, 794.02</span>
      </div>
      <div className="flex space-x-1 bg-green-800 px-1 py-2  border-gray-100 border-r ">
        <Image src="https://assets.coingecko.com/coins/images/5/standard/dogecoin.png" width="20" height="20" layout="fixed"
          alt=" Crypto Currency Exhange" />
        <span className="text-white">DOGE (DOG)</span>
        <span className="text">$ 0.1512</span>
      </div>
      <div className="flex space-x-1 bg-green-800 px-1 py-2  border-gray-100 border-r ">
        <Image src="https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png" width="20" height="20" layout="fixed"
          alt=" Crypto Currency Exhange" />
        <span className="text-white">Bitcoin (BTC)</span>
        <span className="mr-1">$ 66, 075.2</span>
      </div>
      <div className="flex space-x-1 bg-green-800 px-1 py-2  border-gray-100 border-r ">
        <Image src="https://assets.coingecko.com/coins/images/279/standard/ethereum.png" width="20" height="20" layout="fixed"
          alt=" Crypto Currency Exhange" />
        <span className="text-white">Ethereum (ETH)</span>
        <span>$ 1,757.21</span>
      </div>
      <div className="flex space-x-1 bg-green-800 px-1 py-2  border-gray-100 border-r ">
        <Image src="https://assets.coingecko.com/coins/images/325/thumb/Tether.png" width="20" height="20" layout="fixed"
          alt=" Crypto Currency Exhange" />
        <span className="text-white">Tether (USDT)</span>
        <span>$ 1.00</span>
      </div>
      <div className="flex space-x-1 bg-green-800 px-1 py-2  border-gray-100 border-r ">
        <Image src="https://assets.coingecko.com/coins/images/825/standard/bnb-icon2_2x.png" width="20" height="20" layout="fixed"
          alt=" Crypto Currency Exhange" />
        <span className="text-white">BNB (BNB)</span>
        <span className="text">$6, 6075.2</span>
      </div>
      <div className="flex space-x-1 bg-green-800 px-1 py-2  border-gray-100 border-r ">
        <Image src="https://assets.coingecko.com/coins/images/4128/standard/solana.png" width="20" height="20" layout="fixed"
          alt=" Crypto Currency Exhange" />
        <span className="text-white">Solana (SOL)</span>
        <span className="text">$ 139.08</span>
      </div>
      <div className="flex space-x-1 bg-green-800 px-1 py-2  border-gray-100 border-r ">
        <Image src="https://assets.coingecko.com/coins/images/13442/standard/steth_logo.png" width="20" height="20" layout="fixed"
          alt=" Crypto Currency Exhange" />
        <span className="text-white">STETH (BTC)</span>
        <span className="text">$ 3, 794.02</span>
      </div>
      <div className="flex space-x-1 bg-green-800 px-1 py-2  border-gray-100 border-r ">
        <Image src="https://assets.coingecko.com/coins/images/5/standard/dogecoin.png" width="20" height="20" layout="fixed"
          alt=" Crypto Currency Exhange" />
        <span className="text-white">DOGE (DOG)</span>
        <span className="text">$ 0.1512</span>
      </div>
      <div className="flex space-x-1 bg-green-800 px-1 py-2  border-gray-100 border-r ">
        <Image src="https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png" width="20" height="20" layout="fixed"
          alt=" Crypto Currency Exhange" />
        <span className="text-white">Bitcoin (BTC)</span>
        <span className="mr-1">$ 66, 075.2</span>
      </div>
      <div className="flex space-x-1 bg-green-800 px-1 py-2  border-gray-100 border-r ">
        <Image src="https://assets.coingecko.com/coins/images/279/standard/ethereum.png" width="20" height="20" layout="fixed"
          alt=" Crypto Currency Exhange" />
        <span className="text-white">Ethereum (ETH)</span>
        <span>$ 1,757.21</span>
      </div>
      <div className="flex space-x-1 bg-green-800 px-1 py-2  border-gray-100 border-r ">
        <Image src="https://assets.coingecko.com/coins/images/325/thumb/Tether.png" width="20" height="20" layout="fixed"
          alt=" Crypto Currency Exhange" />
        <span className="text-white">Tether (USDT)</span>
        <span>$ 1.00</span>
      </div>
      <div className="flex space-x-1 bg-green-800 px-1 py-2  border-gray-100 border-r ">
        <Image src="https://assets.coingecko.com/coins/images/825/standard/bnb-icon2_2x.png" width="20" height="20" layout="fixed"
          alt=" Crypto Currency Exhange" />
        <span className="text-white">BNB (BNB)</span>
        <span className="text">$6, 6075.2</span>
      </div>
      <div className="flex space-x-1 bg-green-800 px-1 py-2  border-gray-100 border-r ">
        <Image src="https://assets.coingecko.com/coins/images/4128/standard/solana.png" width="20" height="20" layout="fixed"
          alt=" Crypto Currency Exhange" />
        <span className="text-white">Solana (SOL)</span>
        <span className="text">$ 139.08</span>
      </div>
      <div className="flex space-x-1 bg-green-800 px-1 py-2  border-gray-100 border-r ">
        <Image src="https://assets.coingecko.com/coins/images/13442/standard/steth_logo.png" width="20" height="20" layout="fixed"
          alt=" Crypto Currency Exhange" />
        <span className="text-white">STETH (BTC)</span>
        <span className="text">$ 3, 794.02</span>
      </div>
      <div className="flex space-x-1 bg-green-800 px-1 py-2  border-gray-100 border-r ">
        <Image src="https://assets.coingecko.com/coins/images/5/standard/dogecoin.png" width="20" height="20" layout="fixed"
          alt=" Crypto Currency Exhange" />
        <span className="text-white">DOGE (DOG)</span>
        <span className="text">$ 0.1512</span>
      </div>
      <div className="flex space-x-1 bg-green-800 px-1 py-2  border-gray-100 border-r ">
        <Image src="https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png" width="20" height="20" layout="fixed"
          alt=" Crypto Currency Exhange" />
        <span className="text-white">Bitcoin (BTC)</span>
        <span className="mr-1">$ 66, 075.2</span>
      </div>
      <div className="flex space-x-1 bg-green-800 px-1 py-2  border-gray-100 border-r ">
        <Image src="https://assets.coingecko.com/coins/images/279/standard/ethereum.png" width="20" height="20" layout="fixed"
          alt=" Crypto Currency Exhange" />
        <span className="text-white">Ethereum (ETH)</span>
        <span>$ 1,757.21</span>
      </div>
      <div className="flex space-x-1 bg-green-800 px-1 py-2  border-gray-100 border-r ">
        <Image src="https://assets.coingecko.com/coins/images/325/thumb/Tether.png" width="20" height="20" layout="fixed"
          alt=" Crypto Currency Exhange" />
        <span className="text-white">Tether (USDT)</span>
        <span>$ 1.00</span>
      </div>
      <div className="flex space-x-1 bg-green-800 px-1 py-2  border-gray-100 border-r ">
        <Image src="https://assets.coingecko.com/coins/images/825/standard/bnb-icon2_2x.png" width="20" height="20" layout="fixed"
          alt=" Crypto Currency Exhange" />
        <span className="text-white">BNB (BNB)</span>
        <span className="text">$6, 6075.2</span>
      </div>
      <div className="flex space-x-1 bg-green-800 px-1 py-2  border-gray-100 border-r ">
        <Image src="https://assets.coingecko.com/coins/images/4128/standard/solana.png" width="20" height="20" layout="fixed"
          alt=" Crypto Currency Exhange" />
        <span className="text-white">Solana (SOL)</span>
        <span className="text">$ 139.08</span>
      </div>
      <div className="flex space-x-1 bg-green-800 px-1 py-2  border-gray-100 border-r ">
        <Image src="https://assets.coingecko.com/coins/images/13442/standard/steth_logo.png" width="20" height="20" layout="fixed"
          alt=" Crypto Currency Exhange" />
        <span className="text-white">STETH (BTC)</span>
        <span className="text">$ 3, 794.02</span>
      </div>
      <div className="flex space-x-1 bg-green-800 px-1 py-2  border-gray-100 border-r ">
        <Image src="https://assets.coingecko.com/coins/images/5/standard/dogecoin.png" width="20" height="20" layout="fixed"
          alt=" Crypto Currency Exhange" />
        <span className="text-white">DOGE (DOG)</span>
        <span className="text">$ 0.1512</span>
      </div>
      {/* Add more crypto items as needed */}
    </Marquee>
  );
};

export default CryptoMarquee;
