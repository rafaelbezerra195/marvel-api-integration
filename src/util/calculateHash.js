var md5 = require('md5');

const calculateHash = (ts, privateKey, publicKey) => {
  return md5(ts+privateKey+publicKey);
}

module.exports = calculateHash;