const kue = require('kue');
import { kueInit } from './jobs/queue.provider';
import { EmailJob } from './jobs/email.job';

const env = process.env.NODE_ENV || 'development';
const Job = kueInit();

const emailJob = new EmailJob(Job);
emailJob.subscribe();

// kue dashboard
if (env == 'development') {
  kue.app.listen(process.env.PORT || 3001);
}
