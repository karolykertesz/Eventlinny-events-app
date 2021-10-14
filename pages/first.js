import { useState, useEffect } from "react";

// import token from '../handlers/token';

const First = ({ message }) => {
  // const [message, setMessage] = useState();

  return <Layer></Layer>;
};

export default First;
First.getInitialProps = async (context) => {
  const cookie = context.req.headers.cookie;
  const url = "https://eventlinny.vercel.app/api/users/validate";
  const response = await fetch(url, {
    headers: {
      cookie: cookie,
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  }).catch((err) => console.log(err));
  // const d = await response.json();
  const r = await response.json();
  const message = r.message;

  // const j = await response.json();
  // const t = j.message;
  // console.log(t);
  return {
    message: message,
  };
};

// const response = await token(
//   'http://localhost:3000/api/users/validate',
//   context
// ).catch((err) => console.log(err));
// console.log(context.req.headers.cookie);

// console.log(response);

// };
