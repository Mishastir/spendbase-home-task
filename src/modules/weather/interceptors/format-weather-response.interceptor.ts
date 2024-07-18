import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { mergeMap } from "rxjs/operators";

import { WEATHER_DATA_RESPONSE_FIELDS } from "../constants";
import { WeatherModel } from "../models";

@Injectable()
export class FormatWeatherResponseInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      mergeMap(async (response: WeatherModel[]) => {
        if (!response) {
          return response;
        }

        const result = [];
        for (const el of response) {
          const newData = this.formatData(el.data);
          result.push({
            ...el,
            data: newData,
          });
        }

        return result;
      }),
    );
  }

  private formatData(data: WeatherModel["data"]): WeatherModel["data"] {
    if (Array.isArray(data)) {
      const newData = [];
      for (const el of data) {
        const newElData = this.processData(el);
        newData.push(newElData);
      }

      return newData;
    }

    return this.processData(data);
  }

  private processData(data: WeatherModel["data"]): WeatherModel["data"] {
    const response = {};
    for (const field of WEATHER_DATA_RESPONSE_FIELDS) {
      response[field] = data[field];
    }

    return response;
  }
}
