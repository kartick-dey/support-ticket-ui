import { environment } from 'environments/environment';

function prepareAPIBaseURL() {
    if (environment.production) {
      return window.location.origin + '/';
    } else {
      return environment.apiUrl;
    }
  }

export const UrlUtils = {
    prepareAPIBaseURL: prepareAPIBaseURL,
};
