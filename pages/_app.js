import "../styles/globals.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { AuthProvider } from "../components/Layout/UserContext";
import Layout from "../components/Layout/Layout";
import Head from "next/head";

import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  );
}

export default MyApp;
