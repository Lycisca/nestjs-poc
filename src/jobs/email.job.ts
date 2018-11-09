import { Job } from './queue.provider';

Job.process('email', function(job, done) {
  done();
});
