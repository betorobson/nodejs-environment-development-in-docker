const {
	parentPort,
	workerData
} = require('worker_threads');

if(workerData.seconds < 1){
	throw new Error('Seconds need to be more than 1');
}

if(workerData.seconds > 10){
	throw new Error('Seconds needd to be less than 11');
}

const { holdRequest } = require('./');

let result = holdRequest(workerData.seconds);

parentPort.postMessage(result);
