import { useState } from 'react';
import Mint from '../components/Mint';
import Create from '../components/Create';

export default function CreatePage() {
  const [mint, setMint] = useState(true);

  return (
    <div className="bg-black text-white flex flex-col gap-4 items-center pb-8">
      <div className="hidden lg:flex justify-between items-center lg:w-[27rem] mb-4 text-xl">
        <div
          onClick={() => setMint(true)}
          className={
            'border-2 rounded-lg py-2 px-4 cursor-pointer ' +
            (mint
              ? 'border-green-400 text-green-400'
              : 'border-black text-white hover:text-green-400')
          }
        >
          <p className="font-semibold">Mint from collection</p>
        </div>
        <div
          onClick={() => setMint(false)}
          className={
            'border-2 rounded-lg py-2 px-4 cursor-pointer ' +
            (mint
              ? 'border-black text-white hover:text-green-400'
              : 'border-green-400 text-green-400')
          }
        >
          <p className=" font-semibold ">Create collection</p>
        </div>
      </div>
      {mint ? <Mint /> : <Create />}
    </div>
  );
}
