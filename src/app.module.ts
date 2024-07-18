import { MiddlewareConsumer, Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";

import { ContextModule, HttpContextMiddleware } from "./common/context";
import {
  GlobalAnyExceptionFilter,
  GlobalBadRequestExceptionFilter,
  GlobalHttpExceptionFilter,
  GlobalPrismaExceptionFilter,
  GlobalServiceExceptionFilter,
} from "./common/filters";
import { HttpLoggerMiddleware, LoggerModule } from "./common/logger";
import { ConfigModule } from "./config";
import { DatabaseModule } from "./database";
import { WeatherModule } from "./modules/weather";

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    ContextModule,
    DatabaseModule,
    WeatherModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: GlobalAnyExceptionFilter },
    { provide: APP_FILTER, useClass: GlobalBadRequestExceptionFilter },
    { provide: APP_FILTER, useClass: GlobalHttpExceptionFilter },
    { provide: APP_FILTER, useClass: GlobalPrismaExceptionFilter },
    { provide: APP_FILTER, useClass: GlobalServiceExceptionFilter },
  ],
})
export class AppModule {
  // eslint-disable-next-line class-methods-use-this
  configure(consumer: MiddlewareConsumer): void {
    // (.*) is for fastify
    consumer.apply(HttpContextMiddleware).forRoutes("*").apply(HttpLoggerMiddleware).forRoutes("*");
  }
}
