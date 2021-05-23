import "../styles/globals.css";
import { AuthProvider } from "../components/Layout/UserContext";
import Layout from "../components/Layout/Layout";
import Head from "next/head";

// import { firebase } from "../helpers/firebase";
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
