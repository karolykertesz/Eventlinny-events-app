export const addlocation = async (location) => {
  try {
    const mess = await fetch(
      `http://api.geonames.org/postalCodeSearchJSON?placename=${location}&maxRows=1&username=carlo12345`
    );
    const data = await mess.json();
    // console.log(data.postalCodes[0].lng, "ddd");
    console.log(data);
    return {
      zoom: 8,
      latitude: await data.postalCodes[0].lat,
      longitude: await data.postalCodes[0].lng,
      postalcode: await data[0].countryCode,
    };
  } catch (err) {
    console.log(err);
  }
};
