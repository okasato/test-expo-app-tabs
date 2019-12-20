// const RippleAPI = require('ripple-lib').RippleAPI;
// const Mnemonic = require('bitcore-mnemonic');
const { Wallet } = require("xpring-common-js");

// exports.generateWalletAddress = () => {
export const generateWalletAddress = () => {
  // const api = new RippleAPI();
  // const { generateXAddress } = api;
  // const result = generateXAddress();
  // Generate a random wallet.
  const generationResult = Wallet.generateRandomWallet();
  return generationResult;
};

// exports.getMnemonic = () => {
// export const getMnemonic = () => {
//   const code = new Mnemonic(Mnemonic.Words.ENGLISH);
  // code.toString(); // natal hada sutil año sólido papel jamón combate aula flota ver esfera...
  // const xpriv = code.toHDPrivateKey();
//   return code;
// }