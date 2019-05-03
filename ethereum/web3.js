// This file creates a web3 instance for our app
// We refer to this web3 instance in other files

import Web3 from 'web3';

const HDWalletProvider = require('truffle-hdwallet-provider');

let web3;

// Logic to see which environment we are in (either server or client-side)
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // We are in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
} else {
  // We are on the server OR the user is not running metamask
/*  const provider = new Web3.providers.HttpProvider(
    //'HTTP://127.0.0.1:7545'
    //'',
    //'',
    {
      clientConfig: {
        maxReceivedFrameSize: 100000000,
        maxReceivedMessageSize: 100000000,
      }
    }
  );*/
  
  const provider = new HDWalletProvider(
    //'HTTP://127.0.0.1:7545'
    // Ropsten
    'pika pika pika pika chu chu chu mnemonic mnemonic mnemonic', // MNEMONIC
    'HTTP://127.0.0.1:7545' // ETH_CONNECTION_URL
  );
  
  web3 = new Web3(provider);  // Reassign web3 to provider
}


/*const provider = new Web3.providers.HttpProvider(
    // Connect to Ethereum
    // Local
    //'HTTP://127.0.0.1:7545'
    // Test Net
    ''
  );
  web3 = new Web3(provider);  // Reassign web3 to provider
  console.log("web3 provider: "); 
  console.log(web3);
*/

export default web3;
