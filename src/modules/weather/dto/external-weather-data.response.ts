export interface ExternalWeatherDataResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current?: Record<string, unknown>;
  minutely?: Record<string, number>[];
  hourly?: Record<string, unknown>[];
  daily?: Record<string, unknown>[];
  alerts?: Record<string, unknown>[];
}
