import { ApplicationJob } from './application.job';
export class EmailJob extends ApplicationJob {
  performLater(data: { to: string }) {
    this.jobProvider.create(this.event, data).save();
  }

  perform(job, done) {
    console.log('Send email', job.data);
    done();
  }
}
