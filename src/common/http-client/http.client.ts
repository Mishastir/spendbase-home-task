import { HttpException, Logger } from "@nestjs/common";
import { Axios, AxiosRequestConfig } from "axios";

import { ServiceException } from "../exceptions";

export class HttpClient {
  private readonly logger = new Logger(HttpClient.name);
  private axios: Axios;

  constructor(config: AxiosRequestConfig) {
    this.axios = new Axios(config);
  }

  reInit(config: AxiosRequestConfig): void {
    this.axios = new Axios(config);
  }

  public async request<T>(config: AxiosRequestConfig): Promise<T> {
    const { url = this.axios.defaults.baseURL } = config;
    this.logger.debug({ url, message: `http request ${url}` });
    try {
      const response = await this.axios.request({ ...config });
      const { data, status } = response;
      this.logger.debug({ url, status, message: `http response ${url}` });
      return JSON.parse(data || "{}");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const { response } = err;
      if (!response) {
        this.logger.warn({ message: `http client error ${url}`, url });
        throw new ServiceException(err.message, "CLIENT_ERROR", "EXTERNAL_API", { url }, err);
      }
      const { data, status, statusText } = response;

      this.logger.warn({ message: `http response ${url}`, url, status, statusText });
      throw ServiceException.fromHttpException(
        new HttpException(data, status, { cause: data }),
        { statusText, url },
      );
    }
  }
}
