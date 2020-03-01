import axios from 'axios';
import Http from '../Http';
import * as utils from '../utils';
import MockAdapter from 'axios-mock-adapter';

// Http class setup
class Backend extends Http {
  public constructor(baseURL: string) {
    super(baseURL);
  }

  public getUsers() {
    return this._get({ endpoint: 'users' });
  }
}

function createHttpInstance() {
  return new Backend('http://google.com');
}

// axios mocking setup
const axiosMock = new MockAdapter(axios);

const axiosGetRequestReturnData = {
  users: [{ id: 1, name: 'John Smith' }],
};
axiosMock.onGet('/users').reply(200, axiosGetRequestReturnData);

// util spying
jest.spyOn(utils, 'logAxiosEvent').mockReturnValue('');

describe('Http Service', () => {
  let backendInstance: Backend;
  beforeEach(() => {
    backendInstance = createHttpInstance();
    jest.clearAllMocks();
  });

  it('can be extended by another class', () => {
    expect(backendInstance).toBeDefined();
  });

  it('should get data and console log events in development', () => {
    // @ts-ignore
    process.env.NODE_ENV = 'development';

    return backendInstance.getUsers().then(response => {
      expect(response).toEqual(axiosGetRequestReturnData);
      expect(utils.logAxiosEvent).toBeCalled();
    });
  });

  it("shouldn't console log events in production", () => {
    // @ts-ignore
    process.env.NODE_ENV = 'production';

    return backendInstance.getUsers().then(() => {
      expect(utils.logAxiosEvent).toBeCalledTimes(0);
    });
  });
});
