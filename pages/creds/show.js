import React, { Component } from 'react';
import { Container, Grid, Button, Icon } from 'semantic-ui-react';
import Credential from '../../ethereum/contracts/Credential';
import Layout from '../../components/CertificateLayout';
import WitnessedByFooter from '../../components/WitnessedByFooter';
import Bell from '../../components/Bell';
import Withdraw from '../../components/Withdraw';
import web3 from '../../ethereum/web3';
import Head from 'next/head'

class CredsShow extends Component {
  state = {
    WithdrawVisible: false
  }
	// Retrieve the credential contract instance to show the details
	static async getInitialProps(props) {
		const address = props.query.address;
    const credential = Credential(address);
		const credentialDetails = await credential.methods.getCredentialDetails().call();
    const owner = credentialDetails[0];
    const leftName = credentialDetails[1];
    const leftVows = credentialDetails[2];
    const rightName = credentialDetails[3];
    const rightVows = credentialDetails[4];
    const date = credentialDetails[5];
    const bellCounter = credentialDetails[6];

    const weiBalance = await credential.methods.getBalance().call();
    const balance = await web3.utils.fromWei(weiBalance, 'ether');

    return {
      address, owner, leftName, leftVows, rightName, rightVows, date, bellCounter, balance
    };
	}

  async componentDidMount() {
    const viewerAddress = await web3.eth.getAccounts();
    if (this.props.owner == viewerAddress[0]) {
      this.setState({WithdrawVisible: true});
    }
  }

  epochToDate(numString) {
    const date = new Date(parseInt(numString));
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dateString = `${months[month]} ${day}, ${year}`;
    return dateString;
  }

  trunc(text){
    return (text.length > 300) ? `${text.substr(0, 300)} ...` : text;
  }

	render() {
		return (
		  <Layout>
        <Head>
        </Head>
        {(this.state.WithdrawVisible) && <Withdraw address={this.props.address} balance={this.props.balance}/> }
        <Container className='Cert-Container'>

          <div className='Large-Cursive'>On {this.epochToDate(this.props.date)}</div>
          <Grid id='Vows-Grid' stackable={true} columns='equal'>
            <Grid.Column className='Large-Serif'>{ this.props.leftName }</Grid.Column>
            <Grid.Column className= 'Form-Input-Label' width={2}>and</Grid.Column>
            <Grid.Column className='Large-Serif'>{ this.props.rightName }</Grid.Column>
          </Grid>

          <div className='Form-Input-Label'>Were united in eternal matrimony</div>

          <Grid id='Vows-Grid' stackable={true} columns='equal'>
            <Grid.Column className='Vows-Text'>{ this.trunc(this.props.leftVows) }</Grid.Column>
            <Grid.Column width={1}> </Grid.Column>
            <Grid.Column className='Vows-Text'>{ this.trunc(this.props.rightVows) }</Grid.Column>
          </Grid>

          <div className='Large-Cursive'>Ring the Bell</div>
          <Bell address={this.props.address}/>

          <WitnessedByFooter address={this.props.address}/>
        </Container>
		  </Layout>
		)
	}
}

export default CredsShow;