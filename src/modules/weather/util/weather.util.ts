import { ALL_WEATHER_PARTS } from "../constants";
import { ExternalWeatherDataResponse } from "../dto";
import { WeatherPart } from "../enums";

export const getPartsToExclude = (part: WeatherPart): string => {
  const filteredArray = ALL_WEATHER_PARTS.filter((el) => el !== part);

  return filteredArray.join(",");
};

export const getDt = (part: WeatherPart, data: ExternalWeatherDataResponse): number => {
  switch (part) {
    case WeatherPart.CURRENT: {
      return +data[part].dt;
    }
    case WeatherPart.ALERTS: {
      return +data[part][0].start;
    }
    case WeatherPart.DAILY:
    case WeatherPart.HOURLY:
    case WeatherPart.MINUTELY: {
      return +data[part][0].dt;
    }
    default: {
      throw new Error(`Unknown part ${part} in "getDt" function`);
    }
  }

};
