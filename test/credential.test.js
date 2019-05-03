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
const credentialOwner = '0xBB9E82537BF346cB73A593D3A58632a15E43532d';

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  credentialFactory = await new web3.eth.Contract(JSON.parse(compiledCredentialFactory.interface)) // Creates the idea of contract from ABI
    .deploy({ data: compiledCredentialFactory.bytecode })       // Creates deployment package
    .send({ from: accounts[0], gas: '3000000'});

  await credentialFactory.methods.createCredential
    (
      credentialOwner,
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

  it('verifies owner is correct', async () => {
    const owner = await credentialContract.methods.owner().call();
    assert.equal(credentialOwner, owner);
  });
  
  it('verifies id is correct', async () => {
    const id = await credentialContract.methods.id().call();
    assert.equal("5KJ349Q", id);
  });
  
  
})
