type Collection = {
  name: string;
  address: '';
  description: string;
  image: string;
  rules: string[];
};
export const collections: { [key: string]: { [key: string]: Collection } } = {
  mainnet: {
    'the-random-collection': {
      address: '',
      name: 'The Random Collection',
      description:
        'Stable Diffusion is a state of the art text-to-image model that generates images from text. For faster generation and forthcoming API access you can try DreamStudio Beta. This is a collection of random generated images!',
      image: '/the-space-collection/1.png',
      rules: [],
    },
    'the-dog-collection': {
      address: '',
      name: 'The Dog Collection',
      description:
        'Stable Diffusion is a state of the art text-to-image model that generates images from text. For faster generation and forthcoming API access you can try DreamStudio Beta. This is a collection of random generated images!',
      image: '/the-dog-collection/0.png',
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
    'the-space-collection': {
      address: '',
      name: 'The Space Collection',
      description:
        'Stable Diffusion is a state of the art text-to-image model that generates images from text. For faster generation and forthcoming API access you can try DreamStudio Beta. This is a collection of random generated images!',
      image: '/the-space-collection/0.png',
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
    'the-walter-white-collection': {
      address: '',
      name: 'The Walter White Collection',
      description:
        'Stable Diffusion is a state of the art text-to-image model that generates images from text. For faster generation and forthcoming API access you can try DreamStudio Beta. This is a collection of random generated images!',
      image: '/generated/wwwoods1.png',
      rules: ['walter white', 'bryan cranston'],
    },
  },
  shasta: {
    'the-random-collection': {
      address: '',
      name: 'The Random Collection',
      description:
        'Stable Diffusion is a state of the art text-to-image model that generates images from text. For faster generation and forthcoming API access you can try DreamStudio Beta. This is a collection of random generated images!',
      image: '/the-space-collection/1.png',
      rules: [],
    },
    'the-dog-collection': {
      address: '',
      name: 'The Dog Collection',
      description:
        'Stable Diffusion is a state of the art text-to-image model that generates images from text. For faster generation and forthcoming API access you can try DreamStudio Beta. This is a collection of random generated images!',
      image: '/the-dog-collection/0.png',
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
    'the-space-collection': {
      address: '',
      name: 'The Space Collection',
      description:
        'Stable Diffusion is a state of the art text-to-image model that generates images from text. For faster generation and forthcoming API access you can try DreamStudio Beta. This is a collection of random generated images!',
      image: '/the-space-collection/1.png',

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
    'the-walter-white-collection': {
      address: '',
      name: 'The Walter White Collection',
      description:
        'Stable Diffusion is a state of the art text-to-image model that generates images from text. For faster generation and forthcoming API access you can try DreamStudio Beta. This is a collection of random generated images!',
      image: '/generated/wwwoods1.png',
      rules: ['walter white', 'bryan cranston'],
    },
  },
};
