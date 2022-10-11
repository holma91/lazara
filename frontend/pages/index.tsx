import Link from 'next/link';

export default function Home() {
  const images = [
    'space3.png',
    'space4.png',
    'wwwoods2.png',
    'pepe3.png',
    'pepe4.png',
    'wwwoods3.png',
    'img1.png',
    'wwwoods4.png',
    'img2.png',
    'space1.png',
    'space2.png',
    'img3.png',
    'img4.png',
    'pepe1.png',
    'pepe2.png',
    'wwwoods.png',
  ];
  return (
    <div className="flex flex-col items-center py-8 md:py-20 bg-black text-white">
      <div className="flex flex-col gap-6 items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal  w-3/4 md:w-1/2 text-center ">
          AI meets Crypto & NFTs. Available for everyone on Near & Aurora today.
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-light w-10/12 md:w-7/12 text-center">
          Create collections and generate images with State of the Art diffusion
          models, such as DALL-E 2, Imagen and Stable Diffusion.
        </p>
        <div className="flex gap-3 sm:gap-5 mt-2 text-sm sm:text-base">
          <button className="bg-green-400 text-black font-semibold py-3 px-4 sm:px-8 md:px-12 rounded-lg hover:bg-white">
            <Link href="/create">
              <a>Get Started</a>
            </Link>
          </button>
          <button className="border-2 border-white-500 text-white-500 font-semibold py-3 px-4 sm:px-8 md:px-12 rounded-lg hover:bg-white hover:text-black">
            View Gallery
          </button>
        </div>
      </div>
      <div className="flex gap-3 overflow-x-scroll mt-16	md:mt-24 mx-6">
        {images.map((image) => (
          <img
            key={image}
            src={`/generated/${image}`}
            alt="generated image"
            className="h-32 w-32 md:h-52 md:w-52 rounded-lg"
          ></img>
        ))}
      </div>
    </div>
  );
}
