export const addlocation = async (location) => {
  try {
    const mess = await fetch(
      `http://api.geonames.org/postalCodeSearchJSON?placename=${location}&maxRows=1&username=carlo12345`
    );
    const data = await mess.json();
    if (data.postalCodes.length === 0) {
      return {
        zoom: 10,
        latitude: 47.56372785205159,
        longitude: 13.34598541259765,
        postalcode: "AT",
      };
    }

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
