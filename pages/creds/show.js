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
    console.log("cred is");
    console.log(credential);
		const credentialDetails = await credential.methods.getCredentialDetails().call({ from: '0xb83f3514A41B9fb0AEEF42bE8e7a756F0d32Aa6E', gas: 100000 });
    //const credentialDetails = {0:"0x671890EDeF6EDE5bE2ca0e6566C286fbeCc0E3fd", 1:"5NJRT92TTN37", 2:"susen Patil", 3:"Machine Learning", 4:"an online non-credit course authorized by Stanford and offered through Coursera", 5:"Stanford University", 6:"Andrew Ng", 7:1537649322116};
    console.log("call done");
    console.log(credential.options.address);
    console.log("name");
    console.log(credential.options);
    const owner = credentialDetails[0];
    const id = credentialDetails[1];
    const recipientName = credentialDetails[2];
    const courseName = credentialDetails[3];
    const courseDescription = credentialDetails[4];
    const issuerName = credentialDetails[5];
    const instructorName = credentialDetails[6];
    const issuedOn = credentialDetails[7];

    //const weiBalance = await credential.methods.getBalance().call();
    //const balance = await web3.utils.fromWei(weiBalance, 'ether');
    const weiBalance = 0;
    const balance = 0;

    return {
      address, owner, id, recipientName, courseName, courseDescription, issuerName, instructorName, issuedOn, balance
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

          <div className='Large-Cursive'>On {this.epochToDate(this.props.issuedOn)}</div>
          <Grid id='Vows-Grid' stackable={true} columns='equal'>
            <Grid.Column className='Large-Serif'>{ this.props.recipientName }</Grid.Column>
            <Grid.Column className='Large-Serif'>{ this.props.courseName }</Grid.Column>
            <Grid.Column className='Large-Serif'>{ this.props.courseDescription }</Grid.Column>
          </Grid>

          <Grid id='Vows-Grid' stackable={true} columns='equal'>
            <Grid.Column className='Vows-Text'>{ this.props.issuerName }</Grid.Column>
            <Grid.Column className='Vows-Text'>{ this.props.instructorName }</Grid.Column>
          </Grid>

          <div className='Large-Cursive'>Congratulate on the accomplishment</div>
          <Bell address={this.props.owner}/>

         {/* <WitnessedByFooter address={this.props.address}/>*/}
        </Container>
		  </Layout>
		)
	}
}

export default CredsShow;