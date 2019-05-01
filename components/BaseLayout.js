import React from 'react';
import Head from 'next/head';

// Trying out loading feature
import NProgress from 'nprogress';
import Router from 'next/router';

Router.onRouteChangeStart = (url) => {
  NProgress.start();
}
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

export default class BaseLayout extends React.Component {
  render () {
    return (
      <div>
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" />
          <link href="https://fonts.googleapis.com/css?family=Libre+Baskerville:400,700|Pinyon+Script" rel="stylesheet" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        
          <meta property="og:title" content="forevercred.com"/>
          <meta property="og:type" content="website"/>
          <meta property="og:url" content="http://forevercred.com"/>
          <meta property="og:image" content="http://forevercred.com/static/OGFormImg.png"/>
          <meta property="og:site_name" content="forevercred.com"/>
          <meta property="og:description"
                content="Your credentials forever on the blockchain"/>
        
          <link rel="icon" type="image/png" href="http://forevercred.com/static/Logo.png" />
        </Head>
        {this.props.children}
      </div>
    )
  }
}
