import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
// import token from '../handlers/token';

const First = ({ message }) => {
  // const [message, setMessage] = useState();

  return <div>{message && message}</div>;
};

export default First;
First.getInitialProps = async (context) => {
  // const to = await fetch('http://localhost:3000/api/users/validate', {
  //   headers: {
  //     cookie: context.req.headers.cookie,
  //     // 'Content-Type': 'application/json',
  //   },
  const { res, req } = context;
  const cookie = req.headers.cookie;
  const url = 'http://localhost:3000/api/users/validate';
  const response = await fetch(url, {
    headers: {
      cookie: cookie,
      // 'Content-Type': 'application/json',
    },
  }).catch((err) => console.log(err));
  const d = await response.json();
  console.log(d);
  // const j = await response.json();
  // const t = j.message;
  // console.log(t);
  return {
    message: 'boom',
  };
};

// const response = await token(
//   'http://localhost:3000/api/users/validate',
//   context
// ).catch((err) => console.log(err));
// console.log(context.req.headers.cookie);

// console.log(response);

// };
