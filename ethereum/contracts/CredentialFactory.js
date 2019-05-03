// Tell web3 that a deployed copy of 'CredentialFactory' exists
import web3 from '../web3';    // This pulls it from our web3 instance, not actual web3
import CredentialFactory from '../build/CredentialFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CredentialFactory.interface),
  // Set the contract address of CredentialFactory contract here
  
  // ETH_FACTORY_CONTRACT_ADDRESS
  
  // Local Ganache:
  //'0x671890EDeF6EDE5bE2ca0e6566C286fbeCc0E3fd'

  // Test Net
  //'0xc7c1b5bc3240bc41e661ec2c15c51bbe0e7b1bed'
  
  // Mainnet Ethereum main
  '0xb83f3514A41B9fb0AEEF42bE8e7a756F0d32Aa6E'
);

export default instance;
