// const { Wallet, Utils } = require("xpring-common-js");
import { Wallet, Utils } from "xpring-common-js";
import { RippleAPI } from 'ripple-lib';
// const RippleAPI = require('ripple-lib').RippleAPI;

// Generate a random wallet.
export const generateNewWallet = () => {
  const result = Wallet.generateRandomWallet();
  return result;
};

// Get an address from generated random wallet
export const getAddress = input => {
  const wallet = input.wallet;
  const address = wallet.getAddress();
  return address;
};

// Get wallet from mnemonic
export const getWalletFromMnemonic = mnemonic => {
  const wallet = Wallet.generateWalletFromMnemonic(mnemonic);
  return wallet;
};

// Encode an X-Address
export const getXAddressFromRippleClassicAddress = (rippleClassicAddress, tag) => {
  const xAddress = Utils.encodeXAddress(rippleClassicAddress, tag);
  return xAddress;
};

//Decode an X-Address
export const getRippleClassicAddressFromXAddress = xAddress => {
  const classicAddress = Utils.decodeXAddress(xAddress);
  return classicAddress;
};

//Validate ripple address or not
//bitcoin address returns false 
export const isValidRippleAddress = address => {
  return address ? Utils.isValidAddress(address) : false; 
};

//Validate ripple XAddress or not
//XAddress only returns true
export const isValidXAddress = address => {
  return address ? Utils.isValidXAddress(address) : false;
};

//Validate ripple classic address,'r' is the first letter, or not
//classic address only returns true
export const isValidClassicAddress = address => {
  return address ? Utils.isValidClassicAddress(address) : false;
};

const api = new RippleAPI({
  server: 'wss://s.altnet.rippletest.net:51233'
});

export const getBalance = async address => {
  try {
    await api.on('error', (errorCode, errorMessage) => {
      console.log(errorCode + ': ' + errorMessage);
    });
    await api.on('connected', () => {
      console.log('connected');
    });
    await api.on('disconnected', code => {
      console.log('disconnected, code:', code);
    });
    await api.connect();
    let response = await api.getAccountInfo(address);
    console.log('response', response);
    await api.disconnect();
  } catch (error) {
    console.log(error)
  }
}