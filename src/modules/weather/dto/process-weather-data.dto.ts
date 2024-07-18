import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsNumber, Max, Min } from "class-validator";

import { WeatherPart } from "../enums";

// Defaults are set for current weather in London
export class ProcessWeatherDataDto {
  @ApiProperty({ default: 51.509 })
  @IsNumber()
  @Min(-90)
  @Max(90)
  @Transform(({ value }) => +value)
  lat: number;

  @ApiProperty({ default: -0.118 })
  @IsNumber()
  @Min(-180)
  @Max(180)
  @Transform(({ value }) => +value)
  lon: number;

  @ApiProperty({ enum: WeatherPart, default: WeatherPart.CURRENT })
  @IsEnum(WeatherPart)
  part: WeatherPart;
}
