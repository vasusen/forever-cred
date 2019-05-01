import React, { Component } from 'react';
import Layout from '../../components/CertificateLayout'
import CredentialForm from '../../components/CredentialForm'
import { Link } from '../../routes'

class VowsNew extends Component {
	render () {
		return (
  		<Layout>
        <CredentialForm />
      </Layout>
    )
	}
}

export default VowsNew;