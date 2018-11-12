const kue = require('kue');

export const kueInit = () => {
  const Job = kue.createQueue({
    redis: process.env.REDIS_URL,
  });
  return Job;
};

export const jobProvider = {
  provide: 'jobProvider',
  useFactory: () => kueInit(),
};
