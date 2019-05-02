import React, { Component } from 'react';
import { Container, Form, Button, Icon, Input, Message } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import CredentialFactory from '../ethereum/contracts/CredentialFactory';
import Credential from '../ethereum/contracts/Credential';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

// TODO: import helper.js
import { fieldsAreValid, dateToEpoch } from '../helper';

class CredentialForm extends Component {

  state = {
    id: '',
    recipientName: '',
    courseName: '',
    courseDescription: '',
    issuerName: '',
    instructorName: '',
    issuedOn: '',
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
    const fieldErrorMsg = fieldsAreValid(this.state);
    if (!fieldErrorMsg) {
      let { id, recipientName, courseName, courseDescription, issuerName, instructorName } = this.state;
      const issuedOn = dateToEpoch(this.state.issuedOn);

      // Submitting form to the blockchain
      try {
        const accounts = await web3.eth.getAccounts();
        // (1) Create new credential contract
        let transaction = await CredentialFactory.methods
          .createCredential(id, recipientName, courseName, courseDescription, issuerName, instructorName, issuedOn)
          .send({ from: accounts[0] });
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

        <Form.Group widths='equal' className='Form-Group'>
            <Form.Input
              placeholder='mm-dd-yyyy'
              value={ this.state.issuedOn }
              onChange = { event => this.setState({issuedOn: event.target.value}) }
            />
            <Form.Input
              placeholder="ID of the certificate"
              value = { this.state.id }
              onChange = { event => this.setState({id: event.target.value}) }
            />
            <Form.Input
              placeholder="Your Name"
              value = { this.state.recipientName }
              onChange = { event => this.setState({recipientName: event.target.value}) }
            />
        </Form.Group>
        <div className='Line-White-Space'/>

        <div className='Line-White-Space'/>

        <Form.Group widths='equal' className='Form-Group'>
          <Form.Input
            placeholder='Course Name'
            value={ this.state.courseName }
            onChange={ event => this.setState({courseName: event.target.value}) }
          />
          <span>    </span>
          <Form.TextArea
            placeholder='Course Description'
            value={ this.state.courseDescription }
            onChange={ event => this.setState({courseDescription: event.target.value}) }
          />

        </Form.Group>
            
        <Form.Group widths='equal' className='Form-Group'>
          <Form.Input
            placeholder='Issuer Name'
            value={ this.state.issuerName }
            onChange={ event => this.setState({issuerName: event.target.value}) }
          />
          <span>    </span>
          <Form.Input
            placeholder='Instructor Name'
            value={ this.state.instructorName }
            onChange={ event => this.setState({issuerName: event.target.value}) }
          />

        </Form.Group>
        

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
