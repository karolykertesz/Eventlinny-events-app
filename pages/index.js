import { useEffect } from "react";
import Head from "next/head";
const Home = () => {
  const sessionValidation = async () => {
    const value = await fetch("/api/users/validateSesion");
    const status = value.status;
    if (status > 310) {
      window.location = "/login";
    } else {
      window.location = "/events/first";
    }
  };
  useEffect(() => {
    sessionValidation();
  }, []);
  return (
    <div>
      <Head>
        <title>Next Events</title>
        <meta name="description" content="Great events by Next events" />
      </Head>
    </div>
  );
};
export default Home;
