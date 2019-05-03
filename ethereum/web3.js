// This file creates a web3 instance for our app
// We refer to this web3 instance in other files

import Web3 from 'web3';

let web3;

const provider = new Web3.providers.HttpProvider(
    // Connect to Ethereum
    'HTTP://127.0.0.1:7545'
  );
  web3 = new Web3(provider);  // Reassign web3 to provider
  console.log("web3 provider: "); 
  console.log(web3);

export default web3;
