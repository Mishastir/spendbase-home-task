import { WeatherPart } from "../enums";

export const ALL_WEATHER_PARTS: string[] = Object.values(WeatherPart);

export const WEATHER_DATA_RESPONSE_FIELDS: string[] = [
  "sunrise",
  "sunset",
  "temp",
  "feels_like",
  "pressure",
  "humidity",
  "uvi",
  "wind_speed",
];
