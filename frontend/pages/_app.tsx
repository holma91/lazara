import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { createContext, useEffect, useState } from 'react';
import Head from 'next/head';
const TronWeb = require('tronweb');

export const TronWebContext = createContext<any>({});
export const NetworkContext = createContext<any>('');
type ConnectedType = {
  connected: boolean;
  setConnected: (c: boolean) => void;
};
export const ConnectedContext = createContext<ConnectedType>({
  connected: false,
  setConnected: () => {},
});

declare global {
  interface Window {
    tronWeb: any;
    tronLink: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const [tronWeb, setTronWeb] = useState('');
  const [network, setNetwork] = useState('mainnet');
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (window && window.tronWeb) {
      setTronWeb(window.tronWeb);
      if (window.tronWeb.fullNode.host === 'https://api.shasta.trongrid.io') {
        setNetwork('shasta');
      }
      if (window.tronLink.ready) {
        setConnected(true);
      } else {
        // ask on page load?
        // window.tronLink.request({ method: 'tron_requestAccounts' });
      }
      window.addEventListener('message', function (e) {
        if (e.data.message && e.data.message.action == 'setNode') {
          if (
            e.data.message.data.node.fullNode ==
            'https://api.shasta.trongrid.io'
          ) {
            setNetwork('shasta');
          } else {
            setNetwork('mainnet');
          }
        }
      });
    } else {
      console.log('download tronlink');
    }
  }, []);

  return (
    <>
      <Head>
        <title>LAZARA</title>
        <meta
          name="AI generated NFTs"
          content="AI generated NFTs on the Tron blockchain"
        />
        <link rel="icon" href="/the-random-collection/0.png" />
      </Head>
      <TronWebContext.Provider value={tronWeb}>
        <ConnectedContext.Provider value={{ connected, setConnected }}>
          <NetworkContext.Provider value={network}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </NetworkContext.Provider>
        </ConnectedContext.Provider>
      </TronWebContext.Provider>
    </>
  );
}

export default MyApp;
