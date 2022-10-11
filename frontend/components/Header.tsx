import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();
  const page =
    router.asPath === '/create'
      ? 'create'
      : router.asPath === '/gallery'
      ? 'gallery'
      : '';

  return (
    <div className="sticky top-0 z-10 bg-black flex justify-center">
      <div className="justify-self-center flex justify-between items-center px-6 sm:px-12 py-6 bg-black text-white	w-full max-w-screen-xl">
        <div className="flex items-center text-2xl">
          <Link href="/">
            <a>
              SI<span className="text-green-400">ZZ</span>LE
            </a>
          </Link>
        </div>
        <div className="flex items-center gap-4 md:gap-8 text-lg">
          <Link href="/create">
            <a
              className={
                page === 'create'
                  ? 'border-b-4 border-green-400'
                  : 'border-b-4 border-black'
              }
            >
              Create
            </a>
          </Link>
          <Link href="gallery">
            <a
              className={
                page === 'gallery'
                  ? 'border-b-4 border-green-400'
                  : 'border-b-4 border-black'
              }
            >
              Gallery
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
