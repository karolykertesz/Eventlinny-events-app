import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
// import token from '../handlers/token';

const First = ({ message }) => {
  // const [message, setMessage] = useState();

  return <div>{message && message}</div>;
};

export default First;
First.getInitialProps = async (context) => {
  const { req } = context;

  const cookie = await req.headers.cookie;
  const url = 'http://localhost:3000/api/users/validate';
  const response = await fetch(url, {
    headers: {
      cookie: cookie,
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  }).catch((err) => console.log(err));
  // const d = await response.json();
  const r = await response.json();
  console.log(r);
  // const j = await response.json();
  // const t = j.message;
  // console.log(t);
  return {
    message: 'hh',
  };
};

// const response = await token(
//   'http://localhost:3000/api/users/validate',
//   context
// ).catch((err) => console.log(err));
// console.log(context.req.headers.cookie);

// console.log(response);

// };
