import * as ipfsClient from 'ipfs-http-client';

const ipfsAddOptions = {
  cidVersion: 1,
  hashAlg: 'sha2-256',
};

const models: { [key: string]: string } = {
  'stable-diffusion': 'Stable Diffusion',
  'dall-e-2': 'DALL-E 2',
  'imagen:': 'Imagen',
};

const auth =
  'Basic ' +
  Buffer.from(
    process.env.ipfsProjectId + ':' + process.env.ipfsProjectSecret
  ).toString('base64');

export function ensureIpfsUriPrefix(cidOrURI: any) {
  let uri = cidOrURI.toString();
  if (!uri.startsWith('ipfs://')) {
    uri = 'ipfs://' + cidOrURI;
  }

  if (uri.startsWith('ipfs://ipfs/')) {
    uri = uri.replace('ipfs://ipfs/', 'ipfs://');
  }
  return uri;
}

export const generateImageURI = async (generatedImage: string) => {
  const response = await fetch(generatedImage);
  const imageBuffer = await response.arrayBuffer();

  const ipfs = ipfsClient.create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  });

  const { cid } = await ipfs.add(imageBuffer);
  const imageURI = ensureIpfsUriPrefix(cid);
  return imageURI;
};

export const generateMetadataURI = async (
  imageURI: string,
  name: string,
  prompt: string,
  model: string,
  creator: string
) => {
  const metadata = {
    description: prompt,
    name,
    image: imageURI,
    attributes: [
      {
        trait_type: 'Model',
        value: models[model],
      },
      {
        trait_type: 'Creator',
        value: creator,
      },
    ],
  };

  const ipfs = ipfsClient.create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  });

  const { cid: metadataCid } = await ipfs.add({
    path: '/nft/metadata.json',
    content: JSON.stringify(metadata),
  });

  const metadataURI = ensureIpfsUriPrefix(metadataCid) + '/metadata.json';

  return metadataURI;
};
