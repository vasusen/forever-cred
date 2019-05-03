import React from 'react';
import { Container, Button } from 'semantic-ui-react';
import "../style.css";
import { Link } from '../routes';
import BaseLayout from './BaseLayout'

// This is a Head Component, from next!!
import Head from 'next/head';
// My own NavBar component
import NavBar from './NavBar';


// TODO put image in a grid so its somewhat responsive
export default props => {
  return (
    <BaseLayout>
      <NavBar />
      <div className="hero">
         <Container>
          <div className="hero-text">
            <h1 id='Hero-Title'>Your Credentials</h1>
            <h2 id='Hero-Subtitle'>forever on the blockchain</h2>
            <Link route={`/creds/new`}><Button id='Hero-Button' primary size='big'>Add Credential</Button></Link>
          </div>
          </Container>
        {/*<img className='hero-image' src='../../static/Hero-Image.png'/>*/}
        <img className='hero-image' src='../../static/Hero-Image2.svg'/>
      </div>

      <Container>
        {props.children}
      </Container>

    </BaseLayout>
  );
};
