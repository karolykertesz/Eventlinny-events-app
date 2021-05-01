import { Fragment } from 'react';
import Header from '../Layout/Header';
import Head from 'next/head';

const Layout = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Next events</title>
        <meta name="viewport" content="initial-scale=1.0 width=device-width" />
        <meta name="description" content="Next event App" />
      </Head>
      <Header />
      <main>{props.children}</main>
    </Fragment>
  );
};
export default Layout;
