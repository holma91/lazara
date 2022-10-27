import Link from 'next/link';
import { useEffect, useState } from 'react';
import { collectionToPromptToImage } from '../promptToImage';
import { collections } from '../data/collections';

const indexToCollection = [
  'the-space-collection',
  'the-dog-collection',
  'the-walter-white-collection',
  'the-random-collection',
];

export default function Home() {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const collection = indexToCollection[carouselIndex];
  const bannerImages =
    collections['mainnet'][indexToCollection[carouselIndex]].banner;

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prevIndex) => {
        return (prevIndex + 1) % 4;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center pt-8 md:pt-16 bg-black text-white overflow-x-hidden">
      <div className="flex flex-col gap-6 items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal  w-3/4 md:w-1/2 text-center ">
          AI meets Crypto & NFTs. Available for everyone on Tron today.
        </h1>
        <p className="text-base text-zinc-300 sm:text-lg md:text-xl font-light w-10/12 md:w-7/12 text-center">
          Create collections and generate images with State of the Art diffusion
          models, such as DALL-E 2, Imagen and Stable Diffusion.
        </p>
        <div className="flex gap-3 sm:gap-5 mt-2 text-sm sm:text-base">
          <Link href="/create">
            <button className="bg-green-400 text-black font-semibold py-3 px-4 sm:px-8 md:px-12 rounded-lg hover:bg-white">
              <a>Get Started</a>
            </button>
          </Link>
          <Link href="/gallery">
            <button className="border-2 border-white-500 text-white-500 font-semibold py-3 px-4 sm:px-8 md:px-12 rounded-lg hover:bg-white hover:text-black">
              View Gallery
            </button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-3 grid-rows-1 overflow-y-hidden md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-3 mt-8 md:mt-12 mx-6">
        {[...Array(3)].map((_, i) => (
          <a
            key={i + 100}
            className="cursor-pointer"
            href={bannerImages[i]?.nft}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={bannerImages[i]?.image}
              alt="generated image"
              className="rounded-xl"
            ></img>
          </a>
        ))}
        <a
          className="cursor-pointer hidden md:block"
          href={bannerImages[4]?.nft}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={bannerImages[4]?.image}
            alt="generated image"
            className="rounded-xl"
          ></img>
        </a>
        <a
          className="cursor-pointer hidden lg:block"
          href={bannerImages[5]?.nft}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={bannerImages[5]?.image}
            alt="generated image"
            className="rounded-xl"
          ></img>
        </a>
        <a
          className="cursor-pointer hidden 2xl:block"
          href={bannerImages[6]?.nft}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={bannerImages[6]?.image}
            alt="generated image"
            className="rounded-xl"
          ></img>
        </a>
        <a
          className="cursor-pointer hidden 3xl:block"
          href={bannerImages[7]?.nft}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={bannerImages[7]?.image}
            alt="generated image"
            className="rounded-xl"
          ></img>
        </a>
      </div>
      <div className="flex gap-2 items-center mt-6">
        <div
          className={
            'h-3 w-3 rounded-full ' +
            (carouselIndex === 0
              ? 'bg-white'
              : 'bg-black border-2 border-zinc-400')
          }
        ></div>
        <div
          className={
            'h-3 w-3 rounded-full ' +
            (carouselIndex === 1
              ? 'bg-white'
              : 'bg-black border-2 border-zinc-400')
          }
        ></div>
        <div
          className={
            'h-3 w-3 rounded-full ' +
            (carouselIndex === 2
              ? 'bg-white'
              : 'bg-black border-2 border-zinc-400')
          }
        ></div>
        <div
          className={
            'h-3 w-3 rounded-full ' +
            (carouselIndex === 3
              ? 'bg-white'
              : 'bg-black border-2 border-zinc-400')
          }
        ></div>
      </div>
      <div className="bg-black text-zinc-300 w-full py-4 px-6 mt-5 mb-4 flex justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 w-full lg:w-4/6 mt-5">
          <div className="flex flex-col items-center gap-2">
            <p className="text-xl md:text-2xl text-zinc-300">Blockchains</p>
            <p className="text-2xl md:text-3xl font-bold text-green-400">1</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-xl md:text-2xl text-zinc-300">NFTs minted</p>
            <p className="text-2xl md:text-3xl font-bold text-green-400">123</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-xl md:text-2xl text-zinc-300">Collections</p>
            <p className="text-2xl md:text-3xl font-bold text-green-400">5</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-xl md:text-2xl text-zinc-300">Models</p>
            <p className="text-2xl md:text-3xl font-bold text-green-400">2</p>
          </div>
        </div>
      </div>
      <div>
        <div className="mt-8 grid grid-cols-5 grid-rows-2 gap-1">
          {[...Array(14)].map((_, i) => {
            if (i === 0 || i == 10) {
              return (
                <a
                  key={i}
                  className="relative col-span-2 row-span-2 h-full w-full group"
                >
                  <img
                    src={`/the-space-collection/${i}.png`}
                    alt="generated image"
                    className="h-full w-full"
                  ></img>
                  <p className="absolute left-0 bottom-0 text-lg p-4 backdrop-blur-lg invisible group-hover:visible">
                    {
                      Object.keys(
                        collectionToPromptToImage['the-space-collection']
                      )[i]
                    }
                  </p>
                </a>
              );
            }
            return (
              <a
                key={i}
                className="relative col-span-1 row-span-1 h-full w-full group"
              >
                <img
                  src={`/the-space-collection/${i}.png`}
                  alt="generated image"
                  className="h-full w-full"
                ></img>
                <p className=" absolute left-0 bottom-0 text-lg p-4 backdrop-blur-lg invisible group-hover:visible">
                  {
                    Object.keys(
                      collectionToPromptToImage['the-space-collection']
                    )[i]
                  }
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
