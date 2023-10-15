import axios from 'axios';
import { Q_WEATHER_CITY_LOOKUP_API } from '../../constants.ts';

const getCoordinateByCityName = async (cityName: string): Promise<string> => {
  if (!process.env.Q_WEATHER_API_KEY) {
    throw new Error(`Please set environment 'Q_WEATHER_API_KEY'`);
  }

  const res = await axios.get(Q_WEATHER_CITY_LOOKUP_API, {
    params: {
      location: cityName,
      key: process.env.Q_WEATHER_API_KEY,
    }
  });

  const firstMatch = res.data.location[0];
  const { lon, lat } = firstMatch;

  return `${lon},${lat}`;
}

const getCoordinateByCityNameDescriptor = {
  "name": "getCoordinateByCityName",
  "description": "Get the coordinate (longitude, latitude) by city name",
  "parameters": {
    "type": "object",
    "properties": {
      "cityName": {
        "type": "string",
        "description": "The city name, e.g. Xiamen"
      },
    },
    "required": ["cityName"]
  }
};

export { getCoordinateByCityName, getCoordinateByCityNameDescriptor };
