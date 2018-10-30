const axios = require('axios');
// url: Url to fetch json
// params: Params merged with query arguments, query from request low priority
// headers: Custom headers
export const HttpProxy = (
  url: string,
  options: { params?: any; headers?: any } = {},
) =>
  function(target, name, descriptor) {
    const original = descriptor.value;
    const { params, headers } = options;
    descriptor.value = descriptor.value = function(query) {
      return new Promise((resolve, reject) => {
        axios
          .get(url, { params: { ...params, ...query }, headers })
          .then(response => {
            resolve(response.data);
          })
          .catch(reject);
      });
    };

    return descriptor;
  };
