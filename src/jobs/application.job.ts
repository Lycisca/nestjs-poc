export class JobProvider {
  create: (...args: any[]) => { save: () => {} };
  process: (...args: any[]) => {};
}
export class ApplicationJob {
  // event name
  event: string;

  constructor(public readonly jobProvider: JobProvider) {
    this.event = this.constructor.name;
  }

  // publish to redis queue
  performLater(data) {
    this.jobProvider.create(this.event, data).save();
  }

  // subscribe to redis queue
  subscribe() {
    this.jobProvider.process(this.event, this.perform);
  }

  // perform event
  perform(job, done) {
    done();
  }
}
