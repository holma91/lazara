import { collectionToPromptToImage } from '../promptToImage';

export default function Gallery() {
  return (
    <div className="bg-black">
      <div className="grid grid-cols-5 grid-rows-2 gap-2 text-white">
        {[...Array(14)].map((_, i) => {
          if (i === 0 || i == 10) {
            return (
              <a
                key={i}
                className="relative col-span-2 row-span-2 h-full w-full cursor-pointer group"
              >
                <img
                  src={`/space/${i}.png`}
                  alt="generated image"
                  className="h-full w-full"
                ></img>
                <p className="absolute left-0 bottom-0 text-lg p-4 backdrop-blur-lg invisible group-hover:visible">
                  {Object.keys(collectionToPromptToImage['space'])[i]}
                </p>
              </a>
            );
          }
          return (
            <a
              key={i}
              className="relative col-span-1 row-span-1 h-full w-full cursor-pointer group"
            >
              <img
                src={`/space/${i}.png`}
                alt="generated image"
                className="h-full w-full"
              ></img>
              <p className=" absolute left-0 bottom-0 text-lg p-4 backdrop-blur-lg invisible group-hover:visible">
                {Object.keys(collectionToPromptToImage['space'])[i]}
              </p>
            </a>
          );
        })}
        {[...Array(14)].map((_, i) => {
          if (i === 0 || i == 10) {
            return (
              <a
                key={i}
                className="relative col-span-2 row-span-2 h-full w-full cursor-pointer group"
              >
                <img
                  src={`/dogs/${i}.png`}
                  alt="generated image"
                  className="h-full w-full"
                ></img>
                <p className="absolute left-0 bottom-0 text-lg p-4 backdrop-blur-lg invisible group-hover:visible">
                  {Object.keys(collectionToPromptToImage['dogs'])[i]}
                </p>
              </a>
            );
          }
          return (
            <a
              key={i}
              className="relative col-span-1 row-span-1 h-full w-full cursor-pointer group"
            >
              <img
                src={`/dogs/${i}.png`}
                alt="generated image"
                className="h-full w-full"
              ></img>
              <p className=" absolute left-0 bottom-0 text-lg p-4 backdrop-blur-lg invisible group-hover:visible">
                {Object.keys(collectionToPromptToImage['dogs'])[i]}
              </p>
            </a>
          );
        })}
      </div>
    </div>
  );
}
