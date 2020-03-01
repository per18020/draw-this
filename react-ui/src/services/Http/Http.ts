import { logAxiosEvent } from './utils';
import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosBasicCredentials,
  AxiosPromise,
} from 'axios';
import { isProduction } from 'shared/utils';

export default class Http {
  private axios: AxiosInstance;

  public constructor(baseURL: string, defaultAuth?: AxiosBasicCredentials) {
    this.axios = axios.create({
      baseURL,
      auth: defaultAuth,
    });

    this.axios.interceptors.response.use(
      response => {
        this.logEvent({ response });
        return response.data;
      },
      error => {
        this.logEvent({ error });
        return error;
      }
    );
  }

  protected _delete({
    endpoint,
    params,
  }: {
    endpoint: string;
    params?: object;
  }): AxiosPromise {
    const url = endpoint;
    const config = { params };

    return this.axios.delete(url, config);
  }

  protected _get<T>({
    endpoint,
    params,
  }: {
    endpoint: string;
    params?: object;
  }): AxiosPromise<T> {
    const url = endpoint;
    const config = { params };

    return this.axios.get<T>(url, config);
  }

  protected _patch<T>({
    body,
    endpoint,
    formDataBody,
  }: {
    body?: object;
    formDataBody?: FormData;
    endpoint: string;
  }): AxiosPromise<T> {
    const headers = new Headers();
    if (formDataBody) {
      headers.append('Content-Type', 'multipart/form-data');
    }

    const url = endpoint;
    const data = body ? body : formDataBody;
    const config = { headers };

    return this.axios.patch<T>(url, data, config);
  }

  protected _post<T>({
    body,
    endpoint,
    formDataBody,
  }: {
    body?: object;
    formDataBody?: FormData;
    endpoint: string;
  }): AxiosPromise<T> {
    const headers = new Headers();
    if (formDataBody) {
      headers.append('Content-Type', 'multipart/form-data');
    }

    const url = endpoint;
    const data = body ? body : formDataBody;
    const config = { headers };

    return this.axios.post<T>(url, data, config);
  }

  private logEvent({
    response,
    error,
  }: {
    response?: AxiosResponse;
    error?: AxiosError;
  }) {
    if (!isProduction()) {
      logAxiosEvent({ error, response });
    }
  }
}
