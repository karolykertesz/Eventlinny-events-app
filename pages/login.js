import { Fragment, useRef, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import classes from "../components/UI/ui-modules/login.module.css";
import validate, { async } from "validate.js";
import { constraints } from "../helpers/validators/login";
import sender from "../helpers/sender";
import { useRouter } from "next/router";
import { ImGoogle3, ImFacebook2 } from "react-icons/im";
import { IconContext } from "react-icons";
import googleSign from "../helpers/googlesignin";
import facebookSignIn from "../helpers/fb";
import Head from "next/head";
import firebase from "firebase";

const Login = () => {
  const [error, setError] = useState("");
  const [tok, setTok] = useState();
  const [useData, setUseDate] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const tokenRef = useRef();
  useEffect(() => {
    const getToken = async () => {
      const data = await fetch("/api/users/session");
      const token = await data.json();
      await setTok(token.token);
    };
    return getToken();
  }, []);
  useEffect(() => {
    const seeUser = async () => {
      await fetch("/api/users/helpers/destroyUser");
      setUseDate(false);
    };
    return seeUser();
  }, []);
  useEffect(() => {
    if (!useData) {
      const desT = async () => {
        await fetch("/api/users/logout");
      };
      desT();
    }
  }, [setUseDate]);
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
          .then(async (userCred) => {
            let user = {};
            const userObj = await userCred.user;
            user = await {
              uid: userObj.uid,
              email: userObj.email,
              name: userObj.displayName,
            };
            await sender(tok, user);
          })
          .catch((err) => console.log(err));
      }

      setTok("");
      setUseDate(true);
    },
    [tok]
  );

  return (
    <Fragment>
      <Layer>
        <div className={classes.form}>
          <form onSubmit={formSubmit}>
            <div className={classes.control}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" ref={emailRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor="password">Passsword</label>
              <input type="password" id="password" ref={passwordRef} />
            </div>
            <ForMButton>
              <Pi>Login</Pi>
            </ForMButton>
          </form>
          <GoogleButton onClick={() => googleSign()}>
            <IconContext.Provider value={{ color: "white", size: "1.7em" }}>
              <ImGoogle3 />
            </IconContext.Provider>
          </GoogleButton>
          <GoogleButton
            onClick={() => facebookSignIn()}
            style={{ backgroundColor: "blue", border: "1px solid blue" }}
          >
            <IconContext.Provider value={{ color: "white", size: "1.7em" }}>
              <ImFacebook2 />
            </IconContext.Provider>
          </GoogleButton>
          <Error>{error && error}</Error>
        </div>
      </Layer>
    </Fragment>
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
  border-radius: 6px;
  color: white;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  width: 100%;
  margin-top: 10px;

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
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 10px;
`;
