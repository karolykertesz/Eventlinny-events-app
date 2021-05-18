export default async function gettoken() {
  const resp = await fetch("/api/users/helpers/validuser");
  const status = await resp.status;
  if (status > 350) {
    window.location.href = "/login";
    return;
  } else {
    const message = await resp.json();
    return message.message;
  }
}
