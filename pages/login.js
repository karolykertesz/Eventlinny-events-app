import { useRef, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import classes from "../components/holders/css/form.login.module.css";
import validate from "validate.js";
import { constraints } from "../helpers/validators/login";
import sender from "../helpers/sender";

import { ImGoogle3, ImFacebook2 } from "react-icons/im";
import { IconContext } from "react-icons";
import googleSign from "../helpers/googlesignin";
import facebookSignIn from "../helpers/fb";
import Head from "next/head";
import firebase from "firebase";
import Mail from "../components/UI/icons/mail";
import Lock from "../components/UI/icons/lock";
const Login = () => {
  const [error, setError] = useState("");
  const [tok, setTok] = useState();
  const [useData, setUseDate] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const tokenRef = useRef();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        fetch("/api/users/logout");
      }
    });
  });

  useEffect(() => {
    const getToken = async () => {
      const data = await fetch("/api/users/session");
      const token = await data.json();
      await setTok(token.token);
    };

    return getToken();
  }, []);

  const formSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError(undefined);
      const value = await validate(
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
        constraints
      );
      if (value !== undefined) {
        setError("Invalid credentials");
        return;
      }
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      if (tok !== undefined || tok !== null) {
        return firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(async function (userCred) {
            const uid = await userCred.user.uid;
            await sender(tok, uid);
          })
          .then(() => {
            setTok("");
          })
          .catch((err) => setError(err.message));
      }
    },
    [tok]
  );

  return (
    <div className={classes.cover}>
      <div className={classes.loginDiv}>
        <div className={classes.logo}>
          <Image src="/images/e.png" width="50px" height="50px" quality={100} />
        </div>
        <div className={classes.title}>Eventlinny Login</div>
        <form onSubmit={formSubmit}>
          <div className={classes.fields}>
            <div className={classes.email}>
              <div className={classes.icon}>
                <Mail />
              </div>
              <input
                type="email"
                placeholder="Your Email"
                className={classes.inputEmail}
                ref={emailRef}
              />
            </div>
            <div className={classes.pass}>
              <div className={classes.icon}>
                <Lock />
              </div>
              <input
                type="password"
                placeholder="Your Password"
                className={classes.inputPassword}
                ref={passwordRef}
              />
            </div>
            <button className={classes.login}>Login</button>

            <GoogleButton onClick={() => googleSign()}>
              <IconContext.Provider
                value={{ color: "white", className: classes.google }}
              >
                <ImGoogle3 />
              </IconContext.Provider>
            </GoogleButton>
            <Fbbutton onClick={() => facebookSignIn()}>
              <IconContext.Provider
                value={{ color: "white", className: classes.google }}
              >
                <ImFacebook2 />
              </IconContext.Provider>
            </Fbbutton>
            <div className={classes.link}>
              <Link href="/signup">Sign Up</Link>
            </div>
          </div>
        </form>
        <Error>{error && error}</Error>
      </div>
    </div>
  );
};
export default Login;

const Layer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 600px;
  margin: 3rem auto;
`;

export const ForMButton = styled.button`
  cursor: pointer;
  background-color: papayawhip;
  border: 1px solid papayawhip;
  border-radius: 6px;
  color: white;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  width: 100%;
  margin-top: 10px;
  padding: 0;
  margin: 0.2rem auto;
`;

export const GoogleButton = styled.button`
  cursor: pointer;
  background-color: red;
  border: 1px solid red;
  border-radius: 30px;
  color: white;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  width: 100%;
  /* margin-top: 10px; */

  margin: 0.2rem auto;
  padding: 8px;
`;
export const Fbbutton = styled.button`
  cursor: pointer;
  background-color: blue;
  border: 1px solid red;
  border-radius: 30px;
  color: white;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  width: 100%;
  /* margin-top: 10px; */

  margin: 0.2rem auto;
  padding: 8px;
`;

const Pi = styled.p`
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  text-transform: capitalize;
  font-size: 1rem;
  font-weight: bold;
  color: rgb(196, 158, 125);
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  text-transform: uppercase;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 10px;
`;
