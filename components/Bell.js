import React, { Component } from 'react';
import { Button, Modal, Image, Header, Form, Input, Message } from 'semantic-ui-react';
import Credential from '../ethereum/contracts/Credential';
import web3 from '../ethereum/web3';

class Bell extends Component {
  state = {
    loading: false,
    errorMessage: '',
    successMessage: '',
    giftAmount: ''
  }

 congratulate = async () => {
    const credential = Credential(this.props.address);
    this.setState({ loading: true, errorMessage: '', successMessage: '' });
    try {
      const accounts = await web3.eth.getAccounts();
      await credential.methods.congratulate().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.giftAmount, 'ether')
      });

      this.setState({ successMessage: `You've successfully given ${this.state.giftAmount} ether to this person!` });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    const balance = await web3.eth.getBalance(this.props.address);
    console.log(`Balance is ${balance}`);

    this.setState({ loading: false});
  }

  render() {
    return (
      <span className='bell fa fa-bell'>
        <Modal id='Ring-Bell-Modal' trigger={
          <Button id='Bell-Button'><img className='Bell-Icon' src='../static/bell.png' /></Button>} 
          >

          <Modal.Header >Congratulate on the accomplishment</Modal.Header>
          <Modal.Content>
            <Image id='Modal-Image' wrapped size='medium' src='../../static/Transfer.png' />
            <Modal.Description id='Modal-Description'>
              <Header>How much ether would you like to gift?</Header>
              <p>Token of appreciation </p>
              
              <Form onSubmit={this.congratulate} error={!!this.state.errorMessage} success={!!this.state.successMessage}>
                <Input 
                  label={{ basic: true, content: 'Ether' }}
                  labelPosition='right'
                  placeholder='Ether' 
                  value = { this.state.giftAmount }
                  onChange = { event => this.setState({giftAmount: event.target.value}) }
                />
                
                <div>
                  <Message id='Modal-Message' error header='oops!' content={ this.state.errorMessage } />
                  <Message id='Modal-Message' success header='yay!' content={ this.state.successMessage } />
                  <Button loading={ this.state.loading }>Submit</Button>
                </div>
              </Form>


            </Modal.Description>
          </Modal.Content>
        </Modal>
      </span>
    )
  }
}

export default Bell;