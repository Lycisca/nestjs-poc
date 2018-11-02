const PrintLog = (target, name, descriptor) => {
  const original = descriptor.value;
  descriptor.value = function(...args) {
    console.log(`Call ${name} with:`, args);
    const result = original.apply(this, args);
    console.log(`And return: ${result}`);
    return result;
  };

  return descriptor;
};

// TEST
// class Hi {
//   @PrintLog
//   hello(name) {
//     return `Hi ${name}`;
//   }
// }

// new Hi().hello('Miguel');
