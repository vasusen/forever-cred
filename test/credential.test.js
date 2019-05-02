const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledCredentialFactory = require('../ethereum/build/CredentialFactory.json');
const compiledCredential = require('../ethereum/build/Credential.json');

let accounts;
let credentialFactory;
let credentialAddress;
let credentialContract;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  credentialFactory = await new web3.eth.Contract(JSON.parse(compiledCredentialFactory.interface)) // Creates the idea of contract from ABI
    .deploy({ data: compiledCredentialFactory.bytecode })       // Creates deployment package
    .send({ from: accounts[0], gas: '3000000'});

  await credentialFactory.methods.createCredential
    (
      "5KJ349Q", 
      "John Smith", 
      "Machine Learning", "an online non-credit course authorized by Stanford University and offered through Coursera", 
      "Stanford University",
      "Andrew Ng",
      2018-8-19).send({
    from: accounts[0],
    gas: '3000000'
  });

  [credentialAddress] = await credentialFactory.methods.getIssuedCredentials().call();
  credentialContract = await new web3.eth.Contract(
    JSON.parse(compiledCredential.interface),
    credentialAddress
  )
})

describe('Credential', () => {
  it('deploys a credentialFactory and a credentialContract', () => {
    assert.ok(credentialFactory.options.address);
    assert.ok(credentialContract.options.address);
  });

  it('marks caller as the credentialContract manager', async () => {
    const owner = await credentialContract.methods.owner().call();
    assert.equal(accounts[0], owner);
  })
})
