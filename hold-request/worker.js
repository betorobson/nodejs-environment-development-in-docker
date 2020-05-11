const {
	parentPort,
	workerData
} = require('worker_threads');

const { holdRequest } = require('./');

let result = holdRequest(workerData.seconds);

parentPort.postMessage(result);
