import { Job, Queue } from 'kue';
export class JobProvider {
  create(...args: any[]) {
    const saveFunction = () => ({
      on: (..._args: any[]) => saveFunction,
    });
    return { save: saveFunction };
  }
  process: (...args: any[]) => {};
}

export class ApplicationJob {
  // event name
  event: string;

  constructor(public readonly jobProvider: Queue) {
    this.event = this.constructor.name;
  }

  // publish to redis queue
  performLater(data) {
    this.jobProvider.create(this.event, data).save();
  }

  performNow(data) {
    return new Promise((resolve, reject) => {
      const job: Job = this.jobProvider.create(this.event, data).save();
      job
        .on('complete', result => {
          resolve(result);
        })
        .on('failed attempt', (errorMessage, doneAttempts) => {
          reject({ errorMessage, doneAttempts });
        })
        .on('failed', errorMessage => {
          reject({ errorMessage });
        });
    });
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
