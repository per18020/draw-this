import * as Sentry from '@sentry/browser';
import { isProduction } from 'shared/utils';

const consoleIsDefined = typeof console != 'undefined';

class LoggingService {
  public logError(error: any) {
    if (isProduction()) {
      Sentry.captureException(error);
    } else {
      this.log({
        preText: 'Error',
        color: '#F64744',
        data: error,
      });
    }
  }

  public logInfo(info: any) {
    this.log({
      preText: 'Info',
      color: '#b424ed',
      data: info,
    });
  }

  private log({
    preText,
    data,
    color,
  }: {
    preText: string;
    data: any;
    color: string;
  }) {
    if (!isProduction() && consoleIsDefined) {
      console.log(`%c${preText}:`, `color: ${color}`, data);
    }
  }
}

export default new LoggingService();
