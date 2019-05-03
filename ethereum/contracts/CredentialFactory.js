// Tell web3 that a deployed copy of 'CredentialFactory' exists
import web3 from '../web3';    // This pulls it from our web3 instance, not actual web3
import CredentialFactory from '../build/CredentialFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CredentialFactory.interface),
  // Set the contract address of CredentialFactory contract here
  // Ganache:
<<<<<<< Updated upstream
  //'0x6426b195D7439082ea3975d9005EfC6eD7ac6c13'
  '0x5aFfF0aF3d8908436E63D9322Ac04cD50fb54c71'
=======
  '0x6426b195D7439082ea3975d9005EfC6eD7ac6c13'
>>>>>>> Stashed changes
);

export default instance;
