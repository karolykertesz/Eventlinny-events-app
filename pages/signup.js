import { Fragment, useRef, useState } from 'react';
import styled from 'styled-components';
import classes from '../components/UI/ui-modules/login.module.css';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const mess = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({
          firstname: firstNameRef.current.value,
          lastname: lastNameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),

        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (mess.status === 403) {
        setError('something went wrong');
        return;
      }
      if (mess.status === 400) {
        setError('Sorry this email is takken!');
        return;
      }
      setError('Plese Check Your mailbox validation Email was sent');
    } catch (err) {
      console.log(err, 'the error');
    }
  };
  return (
    <Fragment>
      <Layer>
        <div className={classes.form}>
          <form onSubmit={formSubmit}>
            <div className={classes.control}>
              <label htmlFor="firstname">First Name</label>
              <input type="text" id="firstname" ref={firstNameRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor="lastname">Last Name</label>
              <input type="text" id="lastname" ref={lastNameRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" ref={emailRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor="password">Passsword</label>
              <input type="password" id="password" ref={passwordRef} />
            </div>
            <ForMButton>
              <Pi>Sign Up</Pi>
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
  text-transform: capitalize;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 10px;
`;
