import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaHatCowboy, FaFrog, FaRocket, FaTrashAlt } from 'react-icons/fa';
import { TbWorld } from 'react-icons/tb';
import { FiExternalLink } from 'react-icons/fi';
import { MdAddCircle } from 'react-icons/md';

const collectionToColor: { [key: string]: string } = {
  random: 'blue',
  pepes: 'green',
  space: 'purple',
  walterwhite: 'orange',
  trash: 'pink',
};

export default function Create() {
  const [collection, setCollection] = useState('random');
  const [color, setColor] = useState('blue');
  const { register, handleSubmit, watch, formState } = useForm();
  const [progress, setProgress] = useState(0);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [chosenImage, setChosenImage] = useState(0);

  const onSubmit = (prompt: any) => {
    setGeneratedImages([]);
    console.log(prompt);

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 0;
        }
        return oldProgress + 10;
        // const diff = Math.random() * 10;
        // return Math.min(oldProgress + diff, 100);
      });
    }, 50);

    setGeneratedImages([
      'space1.png',
      'space2.png',
      'space3.png',
      'space4.png',
    ]);
  };

  const getImages = (collection: string): string[] => {
    if (collection === 'random') {
      return [
        'img1.png',
        'img2.png',
        'img3.png',
        'img4.png',
        'space1.png',
        'space2.png',
        'space3.png',
        'space4.png',
      ];
    } else if (collection === 'space') {
      return ['space1.png', 'space2.png', 'space3.png', 'space4.png'];
    } else if (collection === 'pepes') {
      return ['pepe1.png', 'pepe2.png', 'pepe3.png', 'pepe4.png'];
    } else if (collection === 'walterwhite') {
      return ['wwwoods.png', 'wwwoods2.png', 'wwwoods3.png', 'wwwoods4.png'];
    }

    return [];
  };

  const handleChangeCollection = (newCollection: string) => {
    setCollection(newCollection);
    setColor(collectionToColor[newCollection]);
  };

  const uploadToIpfs = async () => {
    // do stuff
  };

  return (
    <div className="flex flex-col gap-8 px-8 md:px-20 py-6 md:py-8 bg-black text-white">
      <div className="flex flex-col gap-3 md:gap-6">
        <p className="text-lg md:text-3xl">Choose Collection:</p>
        <div className="flex gap-3 md:gap-4 flex-wrap	">
          <div
            onClick={() => handleChangeCollection('random')}
            className={
              'flex gap-2 items-center py-3 px-5 md:py-4 md:px-6 rounded-lg font-medium hover:bg-blue-500 hover:text-black cursor-pointer ' +
              (collection === 'random'
                ? 'bg-blue-500 text-black'
                : 'bg-zinc-800 text-white')
            }
          >
            <TbWorld />
            <p>Random</p>
          </div>
          <div
            onClick={() => handleChangeCollection('space')}
            className={
              'flex gap-2 items-center py-3 px-5 md:py-4 md:px-6 rounded-lg font-medium hover:bg-purple-500 hover:text-black cursor-pointer ' +
              (collection === 'space'
                ? 'bg-purple-500 text-black'
                : 'bg-zinc-800 text-white')
            }
          >
            <FaRocket />
            <p>Space</p>
          </div>
          <div
            onClick={() => handleChangeCollection('pepes')}
            className={
              'flex gap-2 items-center py-3 px-5 md:py-4 md:px-6 rounded-lg font-medium hover:bg-green-500 hover:text-black cursor-pointer ' +
              (collection === 'pepes'
                ? 'bg-green-500 text-black'
                : 'bg-zinc-800 text-white')
            }
          >
            <FaFrog />
            <p>Pepe&apos;s</p>
          </div>
          <div
            onClick={() => handleChangeCollection('walterwhite')}
            className={
              'flex gap-2 items-center py-3 px-5 md:py-4 md:px-6 rounded-lg font-medium hover:bg-orange-500 hover:text-black cursor-pointer ' +
              (collection === 'walterwhite'
                ? 'bg-orange-500 text-black'
                : 'bg-zinc-800 text-white')
            }
          >
            <FaHatCowboy /> <p>Walter White</p>
          </div>
          <div
            onClick={() => handleChangeCollection('trash')}
            className={
              'flex gap-2 items-center py-3 px-5 md:py-4 md:px-6 rounded-lg font-medium hover:bg-pink-500 hover:text-black cursor-pointer ' +
              (collection === 'trash'
                ? 'bg-pink-500 text-black'
                : 'bg-zinc-800 text-white')
            }
          >
            <FaTrashAlt />
            <p>Trash</p>
          </div>
          <div
            className={
              'flex gap-2 items-center py-3 px-5 md:py-4 md:px-6 rounded-lg font-medium hover:bg-indigo-500 hover:text-black cursor-question bg-zinc-800'
            }
          >
            <MdAddCircle />
            <p>Create Collection</p>
          </div>
        </div>
        <div className="mt-3 flex overflow-x-scroll gap-3">
          {getImages(collection).map((image) => (
            <img
              key={image}
              src={`/generated/${image}`}
              alt="generated image"
              className="h-24 w-24 lg:h-52 lg:w-52 rounded-lg"
            ></img>
          ))}
        </div>
        <div className="flex flex-col justify-center gap-3 mt-6">
          <p className="flex items-center gap-2 text-base md:text-lg lg:text-2xl md:font-semibold">
            You have chosen the collection:{' '}
            <span className={`font-semibold md:font-bold text-green-500`}>
              {collection}
            </span>
            <FiExternalLink className="text-green-500 lg:h-5 lg:w-5" />
          </p>
          <p className="text-lg 2xl:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            nobis molestiae nihil totam cum natus, nostrum sit rerum
            voluptatibus fugit quos doloribus reiciendis dicta veritatis odio
            sunt debitis porro voluptate. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Obcaecati nobis molestiae nihil totam cum natus,
            nostrum sit rerum voluptatibus fugit quos doloribus reiciendis dicta
            veritatis odio sunt debitis porro voluptate.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 md:gap-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="bg-zinc-800 lg:text-lg font-semibold px-4 py-3 w-3/6 md:w-4/6 lg:w-4/5 rounded-l-lg outline-none mb-2"
            {...register('prompt', { required: true })}
          />
          <button
            type="submit"
            className="bg-green-500 text-black lg:text-lg font-semibold px-4 py-3 w-3/6 md:w-2/6 lg:w-1/5 rounded-r-lg outline-none"
          >
            Generate image
          </button>
        </form>
        {progress > 0 ? (
          <p className="text-center py-4 text-base md:text-xl font-semibold">
            {progress}%
          </p>
        ) : generatedImages.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 xl:gap-4">
            {generatedImages.map((image, i) => (
              <img
                key={image}
                onClick={() => setChosenImage(i)}
                src={`/generated/${image}`}
                alt="generated image"
                className={
                  'h-full w-full rounded-lg cursor-pointer ' +
                  (chosenImage === i ? `border-4 border-green-500` : '')
                }
              ></img>
            ))}
          </div>
        ) : (
          <p className="text-center py-4 text-base md:text-xl font-semibold">
            Ready to generate image!
          </p>
        )}
      </div>
      {generatedImages.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 border-4 rounded-t-xl border-green-500 p-12">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6 mt-12 w-5/6">
              <h1 className="text-4xl 3xl:text-5xl font-bold">
                1. Upload Metadata to IPFS
              </h1>
              <div className="flex flex-col gap-2 3xl:gap-3 font-medium text-xl 3xl:text-3xl">
                <p>Name: Walter White #44</p>
                <p>Description: Walter White in the woods</p>
                <p className="flex gap-1 items-center">
                  Image: ipfs://dahsjfhasdfklhasfjdhsdhfdsklhf{' '}
                  <FiExternalLink className="text-green-500 lg:h-5 lg:w-5" />
                </p>

                <p className="flex gap-1 items-center">
                  Generated by: Stable Diffusion{' '}
                  <FiExternalLink className="text-green-500 lg:h-5 lg:w-5" />
                </p>
              </div>
              <button
                onClick={uploadToIpfs}
                className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-black rounded-lg py-3 px-4 font-semibold"
              >
                Upload to IPFS
              </button>
            </div>
            <h1 className="text-4xl 2xl:text-5xl font-bold mt-2">
              2. Mint NFT
            </h1>
          </div>
          <div className="hidden lg:block">
            <img
              src={`/generated/${generatedImages[chosenImage]}`}
              alt="generated image"
              className="w-full rounded-lg cursor-pointer"
            ></img>
          </div>
        </div>
      )}
    </div>
  );
}
