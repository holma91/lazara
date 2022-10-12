import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaHatCowboy, FaFrog, FaRocket, FaTrashAlt } from 'react-icons/fa';
import { TbWorld } from 'react-icons/tb';
import { FiExternalLink } from 'react-icons/fi';
import { FaDog } from 'react-icons/fa';
import { MdAddCircle } from 'react-icons/md';
import Select from 'react-select';
import collections from '../collections.json';

const valueToCollection: { [key: string]: string } = {
  random: 'The Random Collection',
  dogs: 'The Dog Collection',
  space: 'The Space Collection',
  walterwhite: 'The Walter White Collection',
  pepes: 'The Pepe Collection',
  trash: 'The Trash Collection',
};

export const modelOptions = [
  {
    value: 'stable-diffusion',
    label: (
      <div className="p-3 rounded-lg">
        <span>Stable Diffusion</span>
      </div>
    ),
  },
  {
    value: 'dall-e-2',
    label: (
      <div className="p-3">
        <span>DALL-E 2</span>
      </div>
    ),
  },
  {
    value: 'imagen',
    label: (
      <div className="p-3">
        <span>Imagen</span>
      </div>
    ),
  },
];

export const collectionOptions = [
  {
    value: 'random',
    label: (
      <div className="flex gap-2 items-center p-3">
        <TbWorld />
        <span>The Random Collection</span>
      </div>
    ),
  },
  {
    value: 'dogs',
    label: (
      <div className="flex gap-2 items-center p-3">
        <FaDog />
        <span>The Dog Collection</span>
      </div>
    ),
  },
  {
    value: 'space',
    label: (
      <div className="flex gap-2 items-center p-3">
        <FaRocket />
        <span>The Space Collection</span>
      </div>
    ),
  },
  {
    value: 'pepes',
    label: (
      <div className="flex gap-2 items-center p-3">
        <FaFrog />
        <span>The Pepe Collection</span>
      </div>
    ),
  },
  {
    value: 'walterwhite',
    label: (
      <div className="flex gap-2 items-center p-3">
        <FaHatCowboy />
        <span>The Walter White Collection</span>
      </div>
    ),
  },
  {
    value: 'trash',
    label: (
      <div className="flex gap-2 items-center p-3">
        <FaTrashAlt />
        <span>The Trash Collection</span>
      </div>
    ),
  },
];

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    // borderBottom: '2px solid grey',
    color: state.isSelected ? 'grey' : 'white',
    backgroundColor: '#27272a',
    // backgroundColor: state.isSelected ? 'grey' : 'black',
    ':hover': {
      cursor: 'pointer',
      backgroundColor: state.isSelected ? '' : '#3f3f46',
    },
  }),
  input: (provided: any) => ({
    ...provided,
    color: 'white',
  }),
  control: (provided: any) => ({
    ...provided,
    margin: 0,
    backgroundColor: '#27272a',
    border: 0,
    outline: 'none',
    // This line disable the blue border
    boxShadow: 'none',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: 'white',
    // backgroundColor: 'green',
  }),
  menuList: (provided: any) => ({
    ...provided,
    backgroundColor: '#27272a',
    paddingTop: 0,
    paddingBottom: 0,
    border: `1px solid black`,
    // height: '100px',
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    backgroundColor: '#27272a',
  }),
};

const getImages = (collection: string): string[] => {
  if (collection === 'random') {
    return [
      'generated/img1.png',
      'generated/img2.png',
      'generated/img3.png',
      'generated/img4.png',
      'generated/space1.png',
      'generated/space2.png',
      'generated/space3.png',
      'generated/space4.png',
    ];
  } else if (collection === 'dogs') {
    const imgs = [];
    for (let i = 1; i < 12; i++) {
      imgs[i] = `dogs/${i}.png`;
    }
    return imgs;
  } else if (collection === 'space') {
    return [
      'generated/space1.png',
      'generated/space2.png',
      'generated/space3.png',
      'generated/space4.png',
    ];
  } else if (collection === 'pepes') {
    return [
      'generated/pepe1.png',
      'generated/pepe2.png',
      'generated/pepe3.png',
      'generated/pepe4.png',
    ];
  } else if (collection === 'walterwhite') {
    return [
      'generated/wwwoods.png',
      'generated/wwwoods2.png',
      'generated/wwwoods3.png',
      'generated/wwwoods4.png',
    ];
  }

  return [];
};

export default function Create() {
  const [collection, setCollection] = useState('random');
  const [model, setModel] = useState('stable-diffusion');
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [progress, setProgress] = useState(0);
  const [generatedImage, setGeneratedImage] = useState('');

  const onSubmit = async ({ prompt }: any) => {
    if (prompt === 'test') {
      // setError('words', { type: 'custom', message: 'custom message' });
      setGeneratedImage('/generated/space1.png');
      return;
    }

    const valid = validatePrompt(prompt, collection, model);
    if (!valid) return;

    setGeneratedImage('');

    let result = { image: '', error: '' };

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 80) {
          if (result.image === '') {
            let progresses = [50, 60, 70];
            oldProgress = progresses[Math.floor(Math.random() * 3)];
          }
        }
        if (oldProgress === 100) {
          clearInterval(timer);
          return 0;
        }
        return oldProgress + 1;
      });
    }, 50);

    console.log(prompt, collection, model);

    try {
      const response = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          prompt,
        }),
      });
      result = await response.json();
    } catch (e) {
      console.log(e);
    }

    console.log(result);
    setGeneratedImage(result.image);
  };

  const validatePrompt = (
    prompt: string,
    collection: string,
    model: string
  ) => {
    if (collection === 'dogs' || collection === 'space') {
      let collection_: { [key: string]: any } = collections[collection];
      // check if the prompt adheres to the rules
    }
    return true;
  };

  const handleChangeCollection = (selectedOption: any) => {
    setGeneratedImage('');
    setCollection(selectedOption.value);
  };

  const handleChangeModel = (selectedOption: any) => {
    setModel(selectedOption.value);
  };

  return (
    <div className="bg-black text-white flex flex-col gap-4 items-center pb-8">
      <div className="w-3/4 lg:w-[48rem] flex flex-col gap-4">
        <label className="text-xl">Choose collection</label>
        <Select
          className="w-full"
          defaultValue={{
            label: collectionOptions[0].label,
            value: collectionOptions[0].value,
          }}
          options={collectionOptions}
          styles={customStyles}
          onChange={handleChangeCollection}
          autoFocus={true}
        />
      </div>
      <div className="m-5 md:m-10 flex overflow-x-scroll gap-3">
        {getImages(collection).map((image) => (
          <img
            key={image}
            src={`/${image}`}
            alt="generated image"
            className="h-40 w-40 lg:h-52 lg:w-52 rounded-lg"
          ></img>
        ))}
      </div>
      <div className="w-3/4 lg:w-[48rem] flex flex-col gap-4">
        <div className="flex flex-col gap-2 md:gap-4 items-center mb-3">
          <h1 className="text-2xl md:text-3xl text-center">
            {valueToCollection[collection]}
          </h1>
          <p className="text-center w-full md:w-5/6 text-sm md:text-base">
            Stable Diffusion is a state of the art text-to-image model that
            generates images from text. For faster generation and forthcoming
            API access you can try DreamStudio Beta. This is a collection of
            random generated images!
          </p>
        </div>
        <Select
          className="w-full"
          defaultValue={{
            label: modelOptions[0].label,
            value: modelOptions[0].value,
          }}
          options={modelOptions}
          styles={customStyles}
          onChange={handleChangeModel}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="bg-zinc-800 lg:text-lg px-4 py-3 w-4/6 md:w-4/6 lg:w-4/5 rounded-l-md outline-none mb-2"
            placeholder="Enter your prompt..."
            {...register('prompt', { required: true })}
          />
          <button
            type="submit"
            className="bg-green-400 text-black text-base lg:text-lg font-semibold px-4 py-3 w-2/6 md:w-2/6 lg:w-1/5 rounded-r-md outline-none hover:bg-white"
          >
            Generate
          </button>
          {errors.prompt && (
            <span className="px-2 text-red-400">This field is required</span>
          )}
          {errors.words && (
            <span className="px-2 text-red-400">
              Prompt needs to include atleast 1 words from the rules
            </span>
          )}
        </form>
        {(generatedImage === '' || progress !== 0) && (
          <div>
            <div className="relative mb-4 w-full h-64 bg-zinc-900 rounded-lg ">
              <div
                className="h-64 bg-zinc-800 rounded-lg"
                style={{ width: Math.floor(progress) + '%' }}
              ></div>
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg">
                {progress === 0
                  ? 'Ready to generate images!'
                  : `${Math.floor(progress)}%`}
              </p>
            </div>
          </div>
        )}
        {generatedImage !== '' && progress === 0 && (
          <div className="grid grid-cols-2 gap-12 mt-3">
            <div className="flex flex-col gap-4">
              <img
                src={`${generatedImage}`}
                alt="generated image"
                className=" rounded-lg"
              ></img>
              <div className="grid grid-cols-2 gap-4 font-semibold">
                <div className="flex flex-col gap-2 bg-zinc-800 rounded-md p-4">
                  <p className="text-sm">Model</p>
                  <p className="text-sm">Stable Diffusion</p>
                </div>
                <div className="flex flex-col gap-2 bg-zinc-800 rounded-md p-4">
                  <p className="text-sm">Creator</p>
                  <p className="text-sm">0xdeadbeef...1337</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold mt-5">Space Image #324</h1>
              <p className="text-lg">Something cool in space, many colors</p>
              <p className="text-xl font-semibold mt-2">Collection</p>
              <div className="flex items-center gap-5">
                <img
                  src={`/generated/space2.png`}
                  alt="generated image"
                  className="h-12 w-12 rounded-md"
                ></img>
                <p>{valueToCollection[collection]}</p>
              </div>
              <p className="font-semibold text-xl mt-3">Details</p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-lg">Royalties</p>
                  <p className="text-lg text-gray-400">
                    5% goes to the creator
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-lg">Minted</p>
                  <p className="text-lg text-gray-400">Not minted yet</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-lg">Owned by</p>
                  <p className="text-lg text-gray-400">No one</p>
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 bg-green-400 text-black font-semibold px-4 py-3 rounded-md outline-none hover:bg-white"
              >
                Mint NFT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
