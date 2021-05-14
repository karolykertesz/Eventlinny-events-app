navigator.geolocation.getCurrentPosition(getLocation, console.log);

const handler = (fn) => async (req, res) => {};

const getLocation = async (position) => {
  const { latitude, longitude } = position.coords;
  const data = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=bb67b50c778f473485683ec677055afe`
  );
  const message = await data.json();
  console.log(data);
};
