// Tell web3 that a deployed copy of 'CredentialFactory' exists
import web3 from '../web3';    // This pulls it from our web3 instance, not actual web3
import CredentialFactory from '../build/CredentialFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CredentialFactory.interface),
  // This is the address of the contract factory
  // '0x7117f833A11ecFAddD3cBFbe521219b67Fe64FEb'

  // Mainnet
  '0xf600c8faf89504850e26bcb8c03d04fa5b00ac8f'
);

export default instance;
