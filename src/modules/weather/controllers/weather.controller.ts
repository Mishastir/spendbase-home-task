import { Body, Controller, Get, HttpStatus, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

import { SuccessResponse } from "../../../common/abstract";
import { FormattedWeatherData, GetWeatherDataResponse, ProcessWeatherDataDto } from "../dto";
import { FormatWeatherResponseInterceptor, FormatWeatherResponseInterceptorV2 } from "../interceptors";
import { WeatherModel } from "../models";
import { WeatherService } from "../services";

@Controller("weather")
export class WeatherController {
  constructor(
    private readonly weatherService: WeatherService,
  ) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: SuccessResponse })
  async saveWeatherData(@Body() body: ProcessWeatherDataDto): Promise<SuccessResponse> {
    await this.weatherService.saveData(body);

    return ({ success: true });
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: GetWeatherDataResponse })
  @UseInterceptors(FormatWeatherResponseInterceptor)
  async getWeatherData(@Query() query: ProcessWeatherDataDto): Promise<WeatherModel[]> {
    return await this.weatherService.getData(query);
  }

  @Get("v2")
  @ApiResponse({ status: HttpStatus.OK, type: [FormattedWeatherData] })
  @UseInterceptors(FormatWeatherResponseInterceptorV2)
  async getWeatherDataV2(@Query() query: ProcessWeatherDataDto): Promise<WeatherModel[]> {
    return await this.weatherService.getData(query);
  }
}
