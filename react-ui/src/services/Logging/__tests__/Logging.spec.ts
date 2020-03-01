import LoggingService from '../Logging';
import * as Sentry from '@sentry/browser';

const consoleSpy = jest.spyOn(console, 'log');
const sentrySpy = jest.spyOn(Sentry, 'captureException');

describe('LoggingService', () => {
  afterEach(() => {
    consoleSpy.mockClear();
    sentrySpy.mockClear();
  });

  it('uses console.log in non production environments', () => {
    // @ts-ignore
    process.env.NODE_ENV = 'development';
    LoggingService.logError('text');
    expect(consoleSpy).toBeCalled();
  });

  it('does not use console.log in production', () => {
    // @ts-ignore
    process.env.NODE_ENV = 'production';
    LoggingService.logError('text');
    expect(consoleSpy).toBeCalledTimes(0);
  });

  it('logs errors to Sentry in production', () => {
    // @ts-ignore
    process.env.NODE_ENV = 'production';
    LoggingService.logError('text');
    expect(sentrySpy).toBeCalled();
  });

  it('does not log errors to Sentry in development', () => {
    // @ts-ignore
    process.env.NODE_ENV = 'development';
    LoggingService.logError('text');
    expect(sentrySpy).toBeCalledTimes(0);
  });
});
