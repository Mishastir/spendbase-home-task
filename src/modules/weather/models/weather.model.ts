import { ApiProperty } from "@nestjs/swagger";
import { Prisma, Weather } from "@prisma/client";

import { WeatherPart } from "../enums";

export class WeatherModel implements Weather {
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

  @ApiProperty({ type: Object })
  data: Prisma.JsonValue;
}
