const kue = require('kue');

const env = process.env.NODE_ENV || 'development';

export const kueInit = ({ appListen = false } = {}) => {
  const Job = kue.createQueue();
  // kue dashboard
  if (appListen && env == 'development') {
    kue.app.listen(3001);
  }
  return Job;
};

export const jobProvider = {
  provide: 'jobProvider',
  useFactory: () => kueInit(),
};
