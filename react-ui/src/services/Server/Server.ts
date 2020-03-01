import Http from 'services/Http/Http';

class Server extends Http {
  public getPosition(): Promise<any> {
    return this._get({
      endpoint: '',
    });
  }
}

export default new Server('http://api.open-notify.org/iss-now');
