import axios from 'axios';
import { Q_WEATHER_REALTIME_WEATHER_API } from '../../constants.ts';

const getRealTimeWeatherByCoordinate = async (coordinate: string): Promise<string> => {
  if (!process.env.Q_WEATHER_API_KEY) {
    throw new Error(`Please set environment 'Q_WEATHER_API_KEY'`);
  }

  const res = await axios.get(Q_WEATHER_REALTIME_WEATHER_API, {
    params: {
      location: coordinate,
      key: process.env.Q_WEATHER_API_KEY,
    }
  });

  return JSON.stringify(res.data);
}

const getRealTimeWeatherByCoordinateDescriptor = {
  "name": "getRealTimeWeatherByCoordinate",
  "description": "Get the real-time weather for a given coordinate",
  "parameters": {
    "type": "object",
    "properties": {
      "coordinate": {
        "type": "string",
        "description": "The coordinate, e.g. 118.087516,24.479834"
      }
    },
    "required": ["coordinate"]
  }
};

export { getRealTimeWeatherByCoordinate, getRealTimeWeatherByCoordinateDescriptor };
