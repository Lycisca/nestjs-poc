const kue = require('kue');
import { emailProcess } from './email.job';
let jobInstance;
export const kueInit = () => {
  if (jobInstance) return jobInstance;
  const Job = kue.createQueue();
  const env = process.env.NODE_ENV || 'development';
  // kue dashboard
  if (env == 'development') {
    kue.app.listen(3001);
  }

  // register function for email event
  Job.process('email', emailProcess);
  jobInstance = Job;
  return jobInstance;
};
