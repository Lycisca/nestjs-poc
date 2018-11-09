import { Job } from './queue.provider';

Job.create('email', {
  title: 'welcome email for tj',
  to: 'tj@learnboost.com',
  template: 'welcome-email',
}).save();
