import { Fragment, useState, useEffect, useCallback } from "react";
import Header from "../Layout/Header";
import Head from "next/head";
import Footer from "../Layout/footer";

const Layout = (props) => {
  const [isUser, setIsuser] = useState(false);
  const checkUser = useCallback(async () => {
    const mess = await fetch("/api/users/validateSesion");
    const status = await mess.status;
    if (status === 200) {
      setIsuser(true);
    }
  }, [setIsuser]);
  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
    <Fragment>
      <Head>
        <title>Next events</title>
        <meta name="viewport" content="initial-scale=1.0 width=device-width" />
        <meta name="description" content="Next event App" />
      </Head>

      {isUser && <Header />}
      <main>{props.children}</main>
      {isUser && <Footer />}
    </Fragment>
  );
};
export default Layout;
