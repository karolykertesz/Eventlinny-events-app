import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import token from '../handlers/token';

const First = ({ message }) => {
  // const [message, setMessage] = useState();

  return <div>{message && message}</div>;
};

export default First;
First.getInitialProps = async (context) => {
  const response = await token(
    'http://localhost:3000/api/users/validate',
    context
  );
  // console.log(response);
  return {
    message: '',
  };
};
