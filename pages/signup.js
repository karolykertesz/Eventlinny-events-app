import { Fragment, useRef, useState } from "react";
import styled from "styled-components";
import classes from "../components/holders/css/form.login.module.css";
import { useRouter } from "next/router";
import React from "react";
import { GoogleButton } from "./login";
import { IconContext } from "react-icons";
import { ImGoogle3, ImFacebook2 } from "react-icons/im";
import googleSign from "../helpers/googlesignin";
import Image from "next/image";
import Link from "next/link";
import Mail from "../components/UI/icons/mail";
import Lock from "../components/UI/icons/lock";
import { Fbbutton } from "./login";
import UserIcon from "../components/UI/icons/user-icon";
import { useIsUserIn } from "../helpers/firebase-hooks/get-is-user-in";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const firstNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  useIsUserIn();
  const loginWithFace = async () => {
    const sign = await facebookSignIn();
  };
  const formSubmit = async (e) => {
    setError(null);
    e.preventDefault();
    if (
      !firstNameRef.current.value ||
      !emailRef.current.value ||
      !passwordRef.current.value
    ) {
      setError("Missing Input values!!");
      return;
    }
    try {
      const mess = await fetch("/api/users/signer", {
        method: "POST",
        body: JSON.stringify({
          firstname: firstNameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await mess.json();
      setError(data.message);
    } catch (err) {
      console.log(err, "the error");
    }
  };

  return (
    <div className={classes.cover}>
      <div className={classes.grid}>
        <div className={classes.first}>
          <div className={classes.imgDiv}>
            <Image
              src="/images/cook.png"
              height="300px"
              width="300px"
              quality={100}
            />
          </div>
        </div>
        <div className={classes.loginDiv}>
          <div className={classes.logo}>
            <Image
              src="/images/e.png"
              width="50px"
              height="50px"
              quality={100}
            />
          </div>
          <div className={classes.title}>Eventlinny Sign Up</div>
          <form onSubmit={formSubmit}>
            <div className={classes.fields}>
              <div className={classes.email}>
                <div className={classes.icon}>
                  <UserIcon />
                </div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className={classes.inputEmail}
                  ref={firstNameRef}
                />
              </div>
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
              <button className={classes.login}>Sign Up</button>

              <GoogleButton onClick={() => googleSign()}>
                <IconContext.Provider
                  value={{ color: "white", className: classes.google }}
                >
                  <ImGoogle3 />
                </IconContext.Provider>
              </GoogleButton>
              <Fbbutton onClick={() => loginWithFace()}>
                <IconContext.Provider
                  value={{ color: "white", className: classes.google }}
                >
                  <ImFacebook2 />
                </IconContext.Provider>
              </Fbbutton>
              <div className={classes.link}>
                <Link href="/login">Log In</Link>
              </div>
            </div>
          </form>
          <Error>{error && error}</Error>
        </div>
        <div className={classes.second}>
          <div className={classes.secImgDiv}>
            <Image
              src="/images/ballons.png"
              height="400px"
              width="400px"
              quality={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;

export const Layer = styled.div`
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

export const Pi = styled.p`
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  text-transform: capitalize;
  font-size: 1rem;
  font-weight: bold;
  color: rgb(196, 158, 125);
`;

export const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  text-transform: uppercase;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  font-weight: bold;
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
`;
