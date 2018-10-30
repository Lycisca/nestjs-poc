const axios = require('axios');
import { Query } from '@nestjs/common';

class HttpProxyController {
  constructor(private originalFnc, private url, private options: any = {}) {}

  perform(@Query() query) {
    const url = this.url;
    const headers = this.options.headers;
    const params = this.options.params;
    console.log('HttpProxy to: ', url, params);
    // this.originalFnc.apply(this, args);
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params: { ...params, ...query }, headers })
        .then(response => {
          resolve(response.data);
        })
        .catch(reject);
    });
  }
}

// url: Url to fetch json
// params: Params merged with query arguments, query from request low priority
// headers: Custom headers
export const HttpProxy = (
  url: string,
  options: { params?: any; headers?: any } = {},
) => (target, name, descriptor) => {
  const original = descriptor.value;
  const proxy = new HttpProxyController(original, url, options);
  descriptor.value = descriptor.value = proxy.perform.bind(proxy);

  return descriptor;
};
