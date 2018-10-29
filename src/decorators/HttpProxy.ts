const axios = require('axios');

export const HttpProxy = url => (target, name, descriptor) => {
  const original = descriptor.value;
  descriptor.value = function(...args) {
    console.log('Estos son los argumentos', args);
    console.log('HttpProxy to: ', url);
    original.apply(this, args);
    return new Promise((resolve, reject) => {
      console.log(args[0]);
      axios
        .get(url, { params: args[0] })
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

// (async () => {
//   const response = await axios.get('https://catfact.ninja/breeds', {
//     params: {
//       limit: 2,
//     },
//   });
//   console.log(response.data);
// })();
