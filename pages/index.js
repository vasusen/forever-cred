import React, { Component } from 'react';
import Layout from '../components/Layout';
import { Link } from '../routes'
import credentialFactory from '../ethereum/contracts/CredentialFactory';
import CredentialContract from '../ethereum/contracts/Credential';
import { Card, Button, Container } from 'semantic-ui-react';
import { epochToDate } from '../helper';
import { Blacklist } from '../blacklist';
import _ from 'lodash';

class CredentialIndex extends Component {

  static async getInitialProps() {
    const issuedCredentials = await credentialFactory.methods.getIssuedCredentials().call();
    // Omits blacklisted contract addresses from list, to not be shown
    const displayCredentials = _.difference(issuedCredentials, Blacklist);

    // Now contracts are rendered in LIFO order - perfect
    const allCredentials = displayCredentials.reverse();
    const size = allCredentials.length;

    const credentialContracts = await Promise.all(
      Array(size).fill().map((item, index) => {
        return CredentialContract(allCredentials[index]);
      })
    );

    // credentialItems are the actual credential details that will be rendered
    const credentialItems = await Promise.all(
      Array(size).fill().map((item, index) => {
        return credentialContracts[index].methods.getCredentialDetails().call();
      })
    )
    return { allCredentials, credentialItems };
  }

  renderItems() {
    const colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey'];

    const items = this.props.credentialItems.map((credential, index) => {
      return {
        key: this.props.allCredentials[index],
        color: colors[index % colors.length],
        header: `${credential[1]} and ${credential[3]}`,
        meta: `Married on ${epochToDate(credential[5])}`,
        description: (
          <Link route={`/creds/${this.props.allCredentials[index]}`}>
            <a className='creds-link'>{ `${credential[2]}`}</a>
          </Link>
          ),
        fluid: true
      }
    })

    return <Card.Group items= { items } className='Index-Cards' itemsPerRow={4} stackable={true} doubling={true}/>
  }

  render() {
    return (
      <Layout>
        <Container>
            <a name="creds"><h2 className='Vows-Title'>Recent Credentials</h2></a>
          { this.renderItems() }
        </Container>
      </Layout>
    )
  }
}

export default CredentialIndex;
