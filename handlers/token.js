// import fetch from "isomorphic-unfetch";
export default async function tokenCheck() {
  const session = await fetch("/api/users/validateSesion");
  const status = await session.status;
  console.log(status);
  if (status === 400) {
    return false;
  }

  return true;
}
