import { Fragment, useEffect, createContext, useState } from "react";
import Header from "../Layout/Header";
import Head from "next/head";
import { useRouter } from "next/router";

export const UserContext = createContext();

const Layout = (props) => {
  const router = useRouter();
  const [user, setUser] = useState();
  useEffect(() => {
    const fetcher = async () => {
      try {
        const mess = await fetch("/api/users/validate");
        const status = mess.status;
        if (status !== 200) {
          router.push("/login");
          return;
        }
        const data = await mess.json();
        // setUser(data);
        setUser(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetcher();
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Next events</title>
        <meta name="viewport" content="initial-scale=1.0 width=device-width" />
        <meta name="description" content="Next event App" />
      </Head>
      <UserContext.Provider value={user && user}>
        <Header />
        <main>{props.children}</main>
      </UserContext.Provider>
    </Fragment>
  );
};
export default Layout;
