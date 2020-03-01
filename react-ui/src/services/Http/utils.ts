import { AxiosError, AxiosResponse } from 'axios';

export function logAxiosEvent({
  response,
  error,
}: {
  response?: AxiosResponse;
  error?: AxiosError;
}) {
  // both axios responses and errors have config objects
  let config;
  if (response) {
    config = response.config;
  }
  if (error) {
    config = error.config;
  }

  let path;
  let url = 'no full url';
  if (config.url && config.baseURL) {
    url = config.baseURL;
    path = config.url.replace(config.baseURL, '');
    if (path === '') {
      path = '/';
    }
  }

  console.log('');
  if (error) {
    console.log(`%cApi Response Failure: ${path}`, 'color: #F64744', url);
    console.group('information');
    console.log('error message: ', error.message);
    console.log('config: ', error.config);
    console.log('request: ', error.request);
  } else if (response) {
    if (response.status === 200) {
      console.log(`%cApi Response Success: ${path}`, 'color: #66B34E', url);
    } else {
      console.log(`%cApi Response Failure: ${path}`, 'color: #F64744', url);
      console.group('information');
      console.log('status: ', response.status);
    }
  }
  if (response) {
    console.log('Axios Response Object: ', response);
  }
  console.groupEnd();
  console.log('');
}
