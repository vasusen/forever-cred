import React, { Component } from 'react';
import { Container, Form, Button, Icon, Input, Message } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import CredentialFactory from '../ethereum/contracts/CredentialFactory';
import Credential from '../ethereum/contracts/Credential';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

import { fieldsAreValid, dateToEpoch } from '../helper';
import { getCredentials } from '../scraper';

class CredentialForm extends Component {

  state = {
    id: '',
    recipientName: '',
    courseName: '',
    courseDescription: '',
    issuerName: '',
    instructorName: '',
    issuedOn: '',
    ethereumWalletAddress: '',
    certURL: '',
    loading: false,
    errorMessage: '',
    successMessage: '',
    txnHash: 0,
    credentialContractAddress: 0,
    blockWitnessed: 0,
  }

  // Date format: dd-mm-yyyy
  onDateChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: '', successMessage: '' });

    // Form Validation: check date validity
    //const fieldErrorMsg = fieldsAreValid(this.state);
    const fieldErrorMsg = '';
    if (!fieldErrorMsg) {
      let { ethereumWalletAddress, certURL } = this.state;
      //let { id, recipientName, courseName, courseDescription, issuerName, instructorName } = this.state;
      let { id, recipientName, courseName, courseDescription, issuerName, instructorName, issuedOn } = getCredentials(this.state.certURL);
      const owner = this.state.ethereumWalletAddress;

      // Submitting form to the blockchain
      try {
        const accounts = await web3.eth.getAccounts();
        // (1) Create new credential contract
        let transaction = await CredentialFactory.methods
          .createCredential(owner, id, recipientName, courseName, courseDescription, issuerName, instructorName, issuedOn)
          .send({ from: accounts[0], gas: 100000 });
        // Update Web app
        this.setState({
          txnHash: transaction.transactionHash, blockWitnessed: transaction.blockNumber,
          successMessage: `Your credential has been stored at block: ${transaction.blockNumber} and transaction hash: ${transaction.transactionHash} REDIRECTING NOW ...`
        })
        const contractAddress = transaction.events.ContractCreated.returnValues.contractAddress;
        Router.replaceRoute(`/creds/${contractAddress}`);

      } catch (err) {
        this.setState({ errorMessage: err.message });
      }
    } else {
      // If input fields have input errors:
      this.setState({ errorMessage: fieldErrorMsg });
    }
    this.setState({ loading: false });
  }

  render() {
    return (
      <Container className='Cert-Container'>
      <Form onSubmit={ this.handleSubmit } error={!!this.state.errorMessage} success={!!this.state.successMessage} >

        
        <div className='Line-White-Space'/>
        
        <Form.Input
          placeholder="Your blockchain wallet address"
          value = { this.state.ethereumWalletAddress }
          onChange = { event => this.setState({ethereumWalletAddress: event.target.value}) }
        />
        <Form.Input
          placeholder="Your Coursera certificate URL"
          value = { this.state.certURL }
          onChange = { event => this.setState({certURL: event.target.value}) }
        />
        

        <Message error header='oops!' content={ this.state.errorMessage } />
        <Message success header='yay!' content={ this.state.successMessage } />

        <Button loading={ this.state.loading } id='CredentialBtn' icon labelPosition='left'>
        <Icon name='plus' />
          Submit
        </Button>

      </Form>
      </Container>
    );
  }
};

export default CredentialForm;
