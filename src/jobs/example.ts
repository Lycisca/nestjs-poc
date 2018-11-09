import { kueInit } from './queue.provider';
import './email.job';

const Job = kueInit();
const job = new Promise((resolve, reject) => {
  const job = Job.create('email', {
    title: 'welcome email for tj',
    to: 'tj@learnboost.com',
    template: 'welcome-email',
  }).save();

  job
    .on('complete', function(result) {
      resolve(result);
    })
    .on('failed attempt', function(errorMessage, doneAttempts) {
      reject({ errorMessage, doneAttempts });
    })
    .on('failed', function(errorMessage) {
      reject({ errorMessage });
    });
});
