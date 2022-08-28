const MapboxClient = require("mapbox");
const HttpError = require("../models/http-error");

const client = new MapboxClient("pk.eyJ1IjoiYWNjb3VudGZvcmR1bW15bWVybnByb2plY3QiLCJhIjoiY2t4c21zamQ2MHVjdzJybXAxMzNucXVvdSJ9.4xM2kmxFCHDc3G4Vfm3wuw");

let data;

async function getCoordsForAddress(address) {
  data = await client.geocodeForward(address);

  if (!data) {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }
  
  const coordinates = {
    lat: data.entity.features[0].center[1],
    lng: data.entity.features[0].center[0]
  };

  return coordinates;
}

module.exports = getCoordsForAddress;
