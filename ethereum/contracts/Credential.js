import web3 from '../web3';
import Credential from '../build/Credential.json';

export default (address) => {
  return new web3.eth.Contract(
    JSON.parse(Credential.interface),
    address
  )
}
