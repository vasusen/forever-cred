// Tell web3 that a deployed copy of 'CredentialFactory' exists
import web3 from '../web3';    // This pulls it from our web3 instance, not actual web3
import CredentialFactory from '../build/CredentialFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CredentialFactory.interface),
  // Set the contract address of CredentialFactory contract here
  // Ganache:
  '0x671890EDeF6EDE5bE2ca0e6566C286fbeCc0E3fd'
);

export default instance;
