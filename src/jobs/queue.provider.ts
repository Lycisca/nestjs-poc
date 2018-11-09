const kue = require('kue');
const Job = kue.createQueue();

export { Job };

kue.app.listen(3001);
