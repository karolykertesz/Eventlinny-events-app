import "../styles/globals.css";
import Layout from "../components/Layout/Layout";
// import { firebase } from "../helpers/firebase";
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
