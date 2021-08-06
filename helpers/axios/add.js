export const addlocation = async (location) => {
  try {
    const mess = await fetch(
      `http://api.geonames.org/postalCodeSearchJSON?placename=${location}&maxRows=1&username=carlo12345`
    );
    const data = await mess.json();

    return {
      zoom: 10,
      latitude: data.postalCodes[0].lat,
      longitude: data.postalCodes[0].lng,
      postalcode: data.postalCodes[0].countryCode,
    };
  } catch (err) {
    console.log(err);
  }
};
