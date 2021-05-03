import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
export default async function token(url, context) {
  const { req } = context;
  const cookie = req.headers.cookie;
  const response = await fetch(url, {
    headers: {
      cookie: cookie,
    },
  });
  if (response.status === 401 && !req) {
    Router.replace('/login');
    return {};
  }
  if (response.status === 400 && req) {
    Router.replace('/login');
    return {};
  }
  if (response.status === 401 && req) {
    res.writeHead(302, {
      Location: 'http://localhost:3000/login',
    });
    res.end();
    return;
  }
}
