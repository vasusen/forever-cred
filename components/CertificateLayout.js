import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import { Link } from '../routes';
import "../style.css";
import BaseLayout from './BaseLayout'

class CertificateLayout extends Component {
  state = {
    shareURL: ''
  }

  componentDidMount() {
    this.setState({ shareURL: window.location.href });
  }

  render() {
    return (
      <BaseLayout>
        
        <div className="Certificate-Layout">
          <div className="Certificate-Layout-Child">
          <div className="Certificate-Layout-Header">
            <Link route={`/`}><a className='Home-Button'>Forevercred</a></Link>
            <img className="Certificate-Layout-Image" src='/static/argyle.png'/>
            <h1 className="Cert-of-Credential-Title">Certificate Of Completion</h1>
            <div className="Cert-of-Credential-Subtitle">Your credential on the blockchain</div>
          </div>

          { this.props.children }

          </div>
        </div>
      </BaseLayout>
    )
  }
}

export default CertificateLayout;
