const axios = require('axios');
import { Query } from '@nestjs/common';

class HttpProxyController {
  constructor(
    private originalFnc,
    private url,
    private headers = {},
    private params = {},
  ) {}

  perform(@Query() query) {
    const url = this.url;
    const headers = this.headers;
    const params = this.params;
    console.log('HttpProxy to: ', url);
    // this.originalFnc.apply(this, args);
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params: { ...query, ...params }, headers })
        .then(response => {
          resolve(response.data);
        })
        .catch(reject);
    });
  }
}

// url: url to fetch json
// params: params merged with query arguments
// headers: custom headers
export const HttpProxy = (url: string, params: any = {}, headers: any = {}) => (
  target,
  name,
  descriptor,
) => {
  const original = descriptor.value;
  const proxy = new HttpProxyController(original, url);
  descriptor.value = descriptor.value = proxy.perform.bind(proxy);

  return descriptor;
};
