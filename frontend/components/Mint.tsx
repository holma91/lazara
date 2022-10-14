import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FaHatCowboy,
  FaFrog,
  FaRocket,
  FaTrashAlt,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';
import { TbWorld } from 'react-icons/tb';
import { FiExternalLink } from 'react-icons/fi';
import { FaDog } from 'react-icons/fa';
import { MdAddCircle } from 'react-icons/md';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import Select from 'react-select';
import { collections } from '../data/collections';

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
    value: 'walterwhite',
    label: (
      <div className="flex gap-2 items-center p-3">
        <FaHatCowboy />
        <span>The Walter White Collection</span>
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
      'dogs/1.png',
      'space/1.png',
      'space/2.png',
      'space/3.png',
      'dogs/3.png',
      'generated/img3.png',
      'dogs/4.png',
      'space/img5.png',
      'space/6.png',
      'space/7.png',
      'space/8.png',
      'space/9.png',
      'dogs/9.png',
      'dogs/10.png',
      'dogs/1.png',
    ];
  }

  const imgs = [];
  for (let i = 0; i < 12; i++) {
    imgs[i] = `${collection}/${i}.png`;
  }

  return imgs;
};

export default function Mint() {
  const [collection, setCollection] = useState('random');
  const [model, setModel] = useState('stable-diffusion');
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [progress, setProgress] = useState(0);
  const [generatedImage, setGeneratedImage] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [viewRules, setViewRules] = useState(false);

  const onSubmit = async ({ prompt }: any) => {
    if (prompt === 'test') {
      // setError('words', { type: 'custom', message: 'custom message' });
      setGeneratedImage('/generated/space1.png');
      setGeneratedPrompt('test prompt');
      return;
    }

    const valid = validatePrompt(prompt, collection, model);
    if (!valid) {
      setError('rules', {
        type: 'custom',
        message: 'Prompt does not adhere to the collection rules',
      });
      setTimeout(() => {
        clearErrors('rules');
      }, 5000);
      return;
    }

    setGeneratedImage('');
    setGeneratedPrompt('');

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
    setGeneratedPrompt(prompt);
  };

  const validatePrompt = (
    prompt: string,
    collection: string,
    model: string
  ) => {
    let rules = collections[collection].rules;
    return (
      rules.length === 0 ||
      rules.some((substring) => prompt.includes(substring))
    );
  };

  const handleChangeCollection = (selectedOption: any) => {
    setGeneratedImage('');
    setCollection(selectedOption.value);
  };

  const handleChangeModel = (selectedOption: any) => {
    setModel(selectedOption.value);
  };
  return (
    <>
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
          <h1 className="text-2xl md:text-3xl text-center flex gap-4 items-center">
            {collections[collection].name}{' '}
            <BsFillCheckCircleFill className="h-7 w-7 mt-1 text-green-400" />
          </h1>
          <p className="text-center text-zinc-300 w-full md:w-5/6 text-sm md:text-base">
            Stable Diffusion is a state of the art text-to-image model that
            generates images from text. For faster generation and forthcoming
            API access you can try DreamStudio Beta. This is a collection of
            random generated images!
          </p>
          {collections[collection].rules.length > 0 && (
            <div className="flex flex-col gap-2 border-4 border-zinc-800 w-full md:w-5/6 rounded-lg">
              <p
                onClick={() => setViewRules(!viewRules)}
                className="flex justify-between items-center px-4 py-3 font-semibold cursor-pointer"
              >
                Collection Rules
                {viewRules ? <FaChevronDown /> : <FaChevronUp />}
              </p>
              {viewRules && (
                <div className="flex flex-col gap-2 py-2 px-5 mb-2">
                  <p className="text-lg font-semibold">
                    The prompt needs to contain atleast one of the following
                    words:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {collections[collection].rules.map((word) => (
                      <p
                        key={word}
                        className="py-2 px-4 bg-zinc-800 rounded-lg hover:bg-green-400 hover:text-black cursor-pointer"
                      >
                        {word}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
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
          {errors.rules && (
            <span className="px-2 text-red-400">
              Prompt does not follow to the collection rules
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-12 mt-3">
            <div className="flex flex-col gap-4">
              <img
                src={`${generatedImage}`}
                alt="generated image"
                className=" rounded-lg"
              ></img>
              <div className="grid grid-cols-2 gap-4 font-semibold">
                <div className="flex flex-col gap-2 bg-zinc-800 rounded-md p-4">
                  <p className="text-sm">Model</p>
                  <p className="text-xs md:text-sm overflow-x-scroll">
                    Stable Diffusion
                  </p>
                </div>
                <div className="flex flex-col gap-2 bg-zinc-800 rounded-md p-4">
                  <p className="text-sm">Creator</p>
                  <p className="text-xs md:text-sm overflow-x-scroll">
                    0xdead...1337
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold mt-5">{collection} #324</h1>
              <p className="text-lg">{generatedPrompt}</p>
              <p className="text-xl font-semibold mt-2">Collection</p>
              <div className="flex items-center gap-5">
                <img
                  src={collections[collection].image}
                  alt="generated image"
                  className="h-12 w-12 rounded-md"
                ></img>
                <p>{collections[collection].name}</p>
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
    </>
  );
}