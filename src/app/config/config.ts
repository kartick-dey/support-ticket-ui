import { UrlUtils } from './url.utils';

class URLProvider {
  public static get getAPIURL() {
    return UrlUtils.prepareAPIBaseURL();
  }
}

export let config = {
  serverAddress: URLProvider.getAPIURL,
  version: 'v1',
};
