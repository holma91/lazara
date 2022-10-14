import Link from 'next/link';

export default function Home() {
  const images = [
    'dogs/1.png',
    'dogs/2.png',
    'generated/space1.png',
    'generated/space4.png',
    'dogs/3.png',
    'generated/wwwoods2.png',
    'generated/pepe3.png',
    'generated/pepe4.png',
    'dogs/4.png',
    'generated/wwwoods3.png',
    'dogs/5.png',
    'generated/img1.png',
    'generated/wwwoods4.png',
    'dogs/6.png',
    'generated/img2.png',
    'generated/space3.png',
    'generated/space2.png',
    'generated/img3.png',
    'generated/img4.png',
    'generated/pepe1.png',
    'generated/pepe2.png',
    'generated/wwwoods.png',
  ];
  return (
    <div className="flex flex-col items-center py-8 md:py-20 bg-black text-white">
      <div className="flex flex-col gap-6 items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal  w-3/4 md:w-1/2 text-center ">
          AI meets Crypto & NFTs. Available for everyone on Near & Aurora today.
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
          <button className="border-2 border-white-500 text-white-500 font-semibold py-3 px-4 sm:px-8 md:px-12 rounded-lg hover:bg-white hover:text-black">
            View Gallery
          </button>
        </div>
      </div>
      <div className="flex gap-3 overflow-x-scroll mt-16	md:mt-24 mx-6">
        {images.map((image) => (
          <img
            key={image}
            src={`/${image}`}
            alt="generated image"
            className="h-32 w-32 md:h-56 md:w-56 rounded-lg"
          ></img>
        ))}
      </div>
      <div className="bg-black text-zinc-300 w-full py-4 px-6 mt-16 border-t border-zinc-600 flex justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 w-full lg:w-4/6 mt-5">
          <div className="flex flex-col items-center gap-2">
            <p className="text-xl md:text-2xl text-zinc-300">Blockchains</p>
            <p className="text-2xl md:text-3xl font-bold text-green-400">2</p>
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
          <img
            src={`/generated/space1.png`}
            alt="generated image"
            className="col-span-2 row-span-2 h-full w-full"
          ></img>
          <img
            src={`/generated/space2.png`}
            alt="generated image"
            className="col-span-1 h-full w-full"
          ></img>
          <img
            src={`/generated/space2.png`}
            alt="generated image"
            className="col-span-1 h-full w-full"
          ></img>
          <img
            src={`/generated/space2.png`}
            alt="generated image"
            className="col-span-1"
          ></img>
          <img
            src={`/generated/space2.png`}
            alt="generated image"
            className="col-span-1 h-full w-full"
          ></img>
          <img
            src={`/generated/space2.png`}
            alt="generated image"
            className="col-span-1 h-full w-full"
          ></img>
          <img
            src={`/generated/space2.png`}
            alt="generated image"
            className="col-span-1 h-full w-full"
          ></img>
        </div>
      </div>
    </div>
  );
}
