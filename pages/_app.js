import "../styles/globals.css";
import { AuthProvider } from "../components/Layout/UserContext";
import Layout from "../components/Layout/Layout";

// import { firebase } from "../helpers/firebase";
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
