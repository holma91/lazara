import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { ConnectedContext, NetworkContext } from '../pages/_app';

export default function Header() {
  const { connected, setConnected } = useContext(ConnectedContext);
  const network = useContext(NetworkContext);
  const router = useRouter();

  const onConnect = async () => {
    try {
      let response = await window.tronLink.request({
        method: 'tron_requestAccounts',
      });
      console.log(response);
      if (response.code === 200) {
        setConnected(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

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
              LA<span className="text-green-400">Z</span>ARA
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
          {connected ? (
            <div className="h-3 w-3 rounded-full bg-green-400"></div>
          ) : (
            <button
              className="border border-white-500 text-white-500 text-base font-semibold py-2 px-4 rounded-lg hover:bg-white hover:text-black"
              onClick={
                connected ? () => console.log('already connected') : onConnect
              }
            >
              Connect
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
