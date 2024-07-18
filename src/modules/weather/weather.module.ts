import { Module } from "@nestjs/common";

import { WeatherController } from "./controllers";
import { WeatherService } from "./services";

@Module({
  controllers: [
    WeatherController,
  ],
  providers: [
    WeatherService,
  ],
})
export class WeatherModule {}
