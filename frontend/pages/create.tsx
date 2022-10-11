import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaHatCowboy, FaFrog, FaRocket, FaTrashAlt } from 'react-icons/fa';
import { TbWorld } from 'react-icons/tb';
import { FiExternalLink } from 'react-icons/fi';
import { MdAddCircle } from 'react-icons/md';
import Select from 'react-select';

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
    value: 'dalle-2',
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
        <span>Random</span>
      </div>
    ),
  },
  {
    value: 'space',
    label: (
      <div className="flex gap-2 items-center p-3">
        <FaRocket />
        <span>Space</span>
      </div>
    ),
  },
  {
    value: 'pepes',
    label: (
      <div className="flex gap-2 items-center p-3">
        <FaFrog />
        <span>Pepe&apos;s</span>
      </div>
    ),
  },
  {
    value: 'walterwhite',
    label: (
      <div className="flex gap-2 items-center p-3">
        <FaHatCowboy />
        <span>Walter White</span>
      </div>
    ),
  },
  {
    value: 'trash',
    label: (
      <div className="flex gap-2 items-center p-3">
        <FaTrashAlt />
        <span>Trash</span>
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

export default function Create() {
  const [collection, setCollection] = useState('random');
  const [model, setModel] = useState('stable-diffusion');
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

  const handleChangeCollection = (selectedOption: any) => {
    setCollection(selectedOption.value);
  };

  const handleChangeModel = (selectedOption: any) => {
    setModel(selectedOption.value);
  };

  return (
    <div className="bg-black text-white h-screen flex flex-col gap-4 items-center">
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
          instanceId="yo"
          autoFocus={true}
        />
      </div>
      <div className="m-5 md:m-10 flex overflow-x-scroll gap-3">
        {getImages(collection).map((image) => (
          <img
            key={image}
            src={`/generated/${image}`}
            alt="generated image"
            className="h-40 w-40 lg:h-52 lg:w-52 rounded-lg"
          ></img>
        ))}
      </div>
      <div className="w-3/4 lg:w-[48rem] flex flex-col gap-4">
        <div className="flex flex-col gap-2 md:gap-4 items-center mb-3">
          <h1 className="text-2xl md:text-3xl text-center">
            The Random Collection
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
          instanceId="yo"
          autoFocus={true}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="bg-zinc-800 lg:text-lg font-semibold px-4 py-3 w-4/6 md:w-4/6 lg:w-4/5 rounded-l-lg outline-none mb-2"
            {...register('prompt', { required: true })}
          />
          <button
            type="submit"
            className="bg-green-500 text-black text-base lg:text-lg font-semibold px-4 py-3 w-2/6 md:w-2/6 lg:w-1/5 rounded-r-lg outline-none"
          >
            Generate
          </button>
        </form>
      </div>
    </div>
  );
}
