const axios = require('axios');

export const HttpProxy = url => (target, name, descriptor) => {
  // const original = descriptor.value;
  descriptor.value = function(...args) {
    console.log('HttpProxy to: ', url);
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(response => {
          resolve(response.data);
        })
        .catch(reject);
    });
  };

  return descriptor;
};

// TEST
// class Dummy {
//   @HttpProxy('https://catfact.ninja/breeds')
//   perform() {}
// }

// // @ts-ignore
// const r: Promise<any> = new Dummy().perform();
// r.then(response => {
//   console.log(response);
// });
