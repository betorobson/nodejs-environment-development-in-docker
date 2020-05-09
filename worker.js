const { Worker, parentPort } = require('worker_threads');

const myWorkers = require('./workers/test');

let workers = [];
let workerCallback = err => console.log(err);

for(let i=0; i<4; i++){
	let worker = myWorkers.getNewWorker({blah: 1});
	worker.on('message', message => message);
	worker.on('error', workerCallback);
	worker.on('exit', (exitCode) => {

		console.log(exitCode);

		if(exitCode === 0) {
			return null;
		}

		return workerCallback(new Error(`Worker has stopped with code ${exitCode}`));
	});

	workers.push(worker);
}

workers.map((workers, index) => workers.postMessage(JSON.stringify({
	index: index,
	message: 'ping ' + index
})));

setTimeout(() => {
	workers.map((workers, index) => workers.postMessage(JSON.stringify({
		index: index + 20,
		message: 'ping ' + index
	})));
}, 4000);
