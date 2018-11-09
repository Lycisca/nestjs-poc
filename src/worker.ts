import { kueInit } from './jobs/queue.provider';
import { EmailJob } from './jobs/email.job';

const Job = kueInit({ appListen: true });

const emailJob = new EmailJob(Job);
emailJob.subscribe();
