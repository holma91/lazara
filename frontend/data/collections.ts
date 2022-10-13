type Collection = {
  name: string;
  description: string;
  royalties: number;
  image: string;
  rules: string[];
};
export const collections: { [key: string]: Collection } = {
  random: {
    name: 'The Random Collection',
    description:
      'Stable Diffusion is a state of the art text-to-image model that generates images from text. For faster generation and forthcoming API access you can try DreamStudio Beta. This is a collection of random generated images!',
    royalties: 0,
    image: '/generated/space3.png',
    rules: [],
  },
  dogs: {
    name: 'The Dog Collection',
    description:
      'Stable Diffusion is a state of the art text-to-image model that generates images from text. For faster generation and forthcoming API access you can try DreamStudio Beta. This is a collection of random generated images!',
    royalties: 0,
    image: '/dogs/1.png',
    rules: [
      'dog',
      'shiba',
      'corgi',
      'cavapoo',
      'labradoodle',
      'golden retriever',
      'pitbull dog',
      'bulldog',
      'poodle',
      'rottweiler',
      'german shepherd',
      'terrier',
      'cavalier king charles spaniel',
      'doberman',
      'schnauzer',
      'siberian husky',
      'havanese',
      'cockapoo',
      'cocker spaniel',
      'pug',
      'mastiff',
      'labrador',
      'samoyed',
    ],
  },
  space: {
    name: 'The Space Collection',
    description:
      'Stable Diffusion is a state of the art text-to-image model that generates images from text. For faster generation and forthcoming API access you can try DreamStudio Beta. This is a collection of random generated images!',
    royalties: 0,
    image: '/generated/space1.png',
    rules: [
      'space',
      'universe',
      'black hole',
      'wormhole',
      'supernova',
      'mercury',
      'venus',
      'tellus',
      'moon',
      'mars',
      'jupiter',
      'saturn',
      'uranus',
      'neptune',
      'pluto',
    ],
  },
  walterwhite: {
    name: 'The Walter White Collection',
    description:
      'Stable Diffusion is a state of the art text-to-image model that generates images from text. For faster generation and forthcoming API access you can try DreamStudio Beta. This is a collection of random generated images!',
    royalties: 0,
    image: '/generated/wwwoods1.png',
    rules: ['walter white', 'bryan cranston'],
  },
};
