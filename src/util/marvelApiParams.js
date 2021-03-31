require('dotenv').config();
const calculateHash = require('./calculateHash');

const getMarvelApiParams = () => {
  const ts = Date.now();
  const apiPublicKey = process.env.MARVEL_API_PUBLIC_KEY;
  const apiPrivateKey = process.env.MARVEL_API_PRIVATE_KEY;
  const hash = calculateHash(ts,apiPrivateKey,apiPublicKey);
  const gateway = process.env.MARVEL_API_GATEWAY;
  
  return {
    ts: ts,
    apiPublicKey: apiPublicKey,
    hash: hash,
    gateway: gateway,
  };
}

module.exports = getMarvelApiParams;