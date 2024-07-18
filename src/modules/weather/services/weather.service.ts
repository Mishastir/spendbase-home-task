import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { ExternalWeatherDataResponse, ProcessWeatherDataDto } from "../dto";
import { WeatherModel } from "../models";
import { getDt, getPartsToExclude } from "../util";

import { HttpClient } from "@module/common/http-client";
import { ConfigService } from "@module/config";
import { PrismaService } from "@module/database";

@Injectable()
export class WeatherService {
  private readonly httpClient: HttpClient;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {
    const oneCallUrl = "https://api.openweathermap.org/data/3.0/onecall";

    this.httpClient = new HttpClient({
      baseURL: oneCallUrl,
    });
  }

  async saveData(data: ProcessWeatherDataDto): Promise<void> {
    const { lat, lon, part } = data;

    const exclude = getPartsToExclude(part);

    const weatherData = await this.httpClient.request<ExternalWeatherDataResponse>({
      params: {
        lat,
        lon,
        exclude,
        appId: this.configService.openWeather.apiKey,
      },
    });

    const { lat: externalLat, lon: externalLon, timezone, timezone_offset: timezoneOffset } = weatherData;
    const dataToSave = weatherData[part];
    const dt = new Date(getDt(part, weatherData) * 1000);

    await this.prismaService.weather.upsert({
      where: {
        lat_lon_part_dt: {
          lat: externalLat,
          lon: externalLon,
          part,
          dt,
        },
      },
      create: {
        lat,
        lon,
        part,
        dt,
        timezone,
        timezoneOffset,
        data: dataToSave as Prisma.JsonValue,
      },
      update: {},
    });
  }

  async getData(data: ProcessWeatherDataDto): Promise<WeatherModel[]> {
    const { lat, lon, part } = data;

    return await this.prismaService.weather.findMany({
      where: {
        lat,
        lon,
        part,
      },
    }) as WeatherModel[];
  }
}
