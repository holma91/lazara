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
    <div className="sticky top-0 z-10 flex justify-between px-8 py-6 bg-black text-white ">
      <div className="flex items-center text-2xl">
        <Link href="/">
          <a>SIZZLE</a>
        </Link>
      </div>
      <div className="flex items-center gap-4 md:gap-8 text-lg">
        <Link href="/create">
          <a
            className={
              page === 'create'
                ? 'border-b-4 border-green-500'
                : 'border-b-4 border-black'
            }
          >
            CREATE
          </a>
        </Link>
        <Link href="gallery">
          <a
            className={
              page === 'gallery'
                ? 'border-b-4 border-green-500'
                : 'border-b-4 border-black'
            }
          >
            GALLERY
          </a>
        </Link>
      </div>
    </div>
  );
}
