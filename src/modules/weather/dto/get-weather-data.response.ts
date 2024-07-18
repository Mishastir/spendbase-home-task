import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";

import { WeatherPart } from "../enums";
import { WeatherModel } from "../models";

export class FormattedWeatherData {
  @ApiProperty()
  sunrise: number;

  @ApiProperty()
  sunset: number;

  @ApiProperty()
  temp: number;

  @ApiProperty()
  feels_like: number;

  @ApiProperty()
  pressure: number;

  @ApiProperty()
  humidity: number;

  @ApiProperty()
  uvi: number;

  @ApiProperty()
  wind_speed: number;
}

@ApiExtraModels(FormattedWeatherData)
export class GetWeatherDataResponse implements Omit<WeatherModel, "data"> {
  @ApiProperty()
  id: string;

  @ApiProperty()
  lat: number;

  @ApiProperty()
  lon: number;

  @ApiProperty({ enum: WeatherPart })
  part: WeatherPart;

  @ApiProperty()
  timezone: string;

  @ApiProperty()
  timezoneOffset: number;

  @ApiProperty()
  dt: Date;

  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(FormattedWeatherData) },
      {
        type: "array",
        items: {
          $ref: getSchemaPath(FormattedWeatherData),
        },
      },
    ],
  })
  data: FormattedWeatherData | FormattedWeatherData[];
}
