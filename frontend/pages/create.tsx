import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaHatCowboy, FaFrog, FaRocket, FaTrashAlt } from 'react-icons/fa';
import { TbWorld } from 'react-icons/tb';
import { FiExternalLink } from 'react-icons/fi';

export default function Create() {
  const [collection, setCollection] = useState('random');
  const { register, handleSubmit, watch, formState } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
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
  };

  return (
    <div className="flex flex-col gap-8 px-8 md:px-20 py-6 md:py-8 bg-black text-white">
      <div className="flex flex-col gap-3 md:gap-6">
        <p className="text-lg md:text-3xl">Choose Collection:</p>
        <div className="flex gap-3 md:gap-4 flex-wrap	">
          <div
            onClick={() => handleChangeCollection('random')}
            className={
              'flex gap-2 items-center py-3 px-5 md:py-4 md:px-6 rounded-3xl font-medium cursor-pointer ' +
              (collection === 'random'
                ? 'bg-blue-500 text-black'
                : 'bg-slate-800 text-white')
            }
          >
            <TbWorld />
            <p>Random</p>
          </div>
          <div
            onClick={() => handleChangeCollection('space')}
            className={
              'flex gap-2 items-center py-3 px-5 md:py-4 md:px-6 rounded-3xl font-medium hover:bg-purple-500 hover:text-black cursor-pointer ' +
              (collection === 'space'
                ? 'bg-purple-500 text-black'
                : 'bg-slate-800 text-white')
            }
          >
            <FaRocket />
            <p>Space</p>
          </div>
          <div
            onClick={() => handleChangeCollection('pepes')}
            className={
              'flex gap-2 items-center py-3 px-5 md:py-4 md:px-6 rounded-3xl font-medium hover:bg-green-500 hover:text-black cursor-pointer ' +
              (collection === 'pepes'
                ? 'bg-green-500 text-black'
                : 'bg-slate-800 text-white')
            }
          >
            <FaFrog />
            <p>Pepe&apos;s</p>
          </div>
          <div
            onClick={() => handleChangeCollection('walterwhite')}
            className={
              'flex gap-2 items-center py-3 px-5 md:py-4 md:px-6 rounded-3xl font-medium hover:bg-orange-500 hover:text-black cursor-pointer ' +
              (collection === 'walterwhite'
                ? 'bg-orange-500 text-black'
                : 'bg-slate-800 text-white')
            }
          >
            <FaHatCowboy /> <p>Walter White</p>
          </div>
          <div
            onClick={() => handleChangeCollection('trash')}
            className={
              'flex gap-2 items-center py-3 px-5 md:py-4 md:px-6 rounded-3xl font-medium hover:bg-pink-500 hover:text-black cursor-pointer ' +
              (collection === 'trash'
                ? 'bg-pink-500 text-black'
                : 'bg-slate-800 text-white')
            }
          >
            <FaTrashAlt />
            <p>Trash</p>
          </div>
        </div>
        <div className="mt-3 flex overflow-x-scroll gap-2 md:gap-8">
          {getImages(collection).map((image) => (
            <img
              key={image}
              src={`/generated/${image}`}
              alt="generated image"
              className="h-24 w-24 md:h-48 md:w-48 lg:h-72 lg:w-72 rounded-xl"
            ></img>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3">
          <p className="text-base md:text-lg lg:text-2xl md:font-semibold">
            You have chosen the collection:{' '}
            <span className="text-green-500 font-semibold md:font-bold">
              {collection}
            </span>
          </p>
          <FiExternalLink className="text-green-500 lg:h-5 lg:w-5" />
        </div>
      </div>
      <div className="flex flex-col gap-3 md:gap-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="bg-slate-800 lg:text-lg font-semibold px-4 py-3 w-3/6 md:w-4/6 lg:w-4/5 rounded-l-2xl outline-none"
            {...register('prompt', { required: true })}
          />
          <button
            type="submit"
            className="bg-green-500 text-black lg:text-lg font-semibold px-4 py-3 w-3/6 md:w-2/6 lg:w-1/5 rounded-r-2xl outline-none"
          >
            Generate image
          </button>
        </form>
        <div className="bg-slate-800 flex items-center justify-center rounded-2xl">
          <p className="py-24 md:py-32 lg:py-48 text-base md:text-xl font-semibold">
            Ready to generate image!
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 md:gap-6"></div>
    </div>
  );
}
