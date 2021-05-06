import { Fragment, useRef, useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import classes from '../components/UI/ui-modules/login.module.css';
import validate from 'validate.js';
import { constraints } from '../helpers/validators/login';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [tok, setTok] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();
  const tokenRef = useRef();
  const formSubmit = async (e) => {
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
      setError('Invalid credentials');
      return;
    }
    try {
      const mess = await fetch('/api/users/loger', {
        method: 'POST',
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),

        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          // 'CSRF-Token': tokenRef.current.value,
        },
      });

      // const data = await mess.json();5
      // const d = mess.json();
      console.log(mess);

      // if (mess.status !== 200) {
      //   setError(data.message);
      //   return;
      // } else {
      //   setTok(data.tokken);
      //   setError(null);
      // }
    } catch (err) {
      console.log(err, 'the error');
    }
  };
  // const sendValid = useCallback(
  //   async (tok) => {
  //     if (!tok) return;
  //     try {
  //       const data = await fetch('/api/users/cookies', {
  //         method: 'POST',
  //         body: JSON.stringify({ userToken: tok }),
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Accept: 'application/json',
  //         },
  //       });
  //       const value = await data.json();
  //       if (data.status !== 200) {
  //         setError(value.tokken);
  //         return;
  //       } else {
  //         router.push('/first');
  //       }
  //     } catch (err) {
  //       console.log(err, 'the error');
  //     }
  //   },
  //   [tok]
  // );
  // useEffect(() => {
  //   sendValid(tok);
  // }, [tok]);
  console.log('hhh');
  return (
    <Fragment>
      <Layer>
        <div className={classes.form}>
          <form onSubmit={formSubmit}>
            <div className={classes.control}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" ref={emailRef} />
            </div>
            <code>{process.env.SESSION_SECRET}</code>
            <div className={classes.control}>
              <label htmlFor="password">Passsword</label>
              <input type="password" id="password" ref={passwordRef} />
              <input
                ref={tokenRef}
                type="hidden"
                name="_csrf"
                value={process.env.SESSION_SECRET}
              />
            </div>
            <ForMButton>
              <Pi>Login</Pi>
            </ForMButton>
          </form>
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

const ForMButton = styled.button`
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
