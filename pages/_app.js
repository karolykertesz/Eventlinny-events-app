import '../styles/globals.css';
import Layout from '../components/Layout/Layout';
// import initAuth from '../helpers/fireadmin';
// initAuth();
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
