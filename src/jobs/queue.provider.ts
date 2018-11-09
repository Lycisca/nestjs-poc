const kue = require('kue');
import { emailProcess } from './email.job';

const Job = kue.createQueue();
const env = process.env.NODE_ENV || 'development';
// keu dashboard
if (env == 'development') {
  kue.app.listen(3001);
}

// register function for email event
Job.process('email', emailProcess);
export { Job };
