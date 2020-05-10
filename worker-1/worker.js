const {
	parentPort,
	workerData
} = require('worker_threads');

let jsonPack = require('../package.json');

let workerPromises = [];

let totalWorkers = workerData.totalWorkers || 1;

let init = () => {
	if(workerData.totalWorkers < 1){
		throw new Error('total workers must be more than zero (0)');
	}else{
		run();
	}
};

let run = () => {

	for(let i=0; i<totalWorkers; i++){
		workerPromises.push(
			new Promise((resolve, reject) => {

			let current = new Date();
			let stopAt = new Date();
			stopAt.setSeconds(stopAt.getSeconds() + 10);
			let stopAtTimestamp = stopAt.getTime();

			while(new Date().getTime() < stopAtTimestamp){
				let any = new Date().getTime();
			}

			resolve({
				version: jsonPack.version,
				workerData: workerData,
				message: ' from worker.postMessage',
				start: current,
				stop: stopAt
			});

			})
		);
	}

	Promise.all(workerPromises)
		.then(results => parentPort.postMessage(results))
		.catch(error => parentPort.postMessage(error));

};

init();

// if(x < 10){
// 	process.exit(1);
// }else{
// 	parentPort.postMessage({
// 		workerData: workerData,
// 		message: ' from worker.postMessage',
// 		x: x,
// 		string: string.length
// 	});
// 	process.exit(0);
// }


// parentPort.on(
// 	'message',
// 	message => {

// 		let x = 0;
// 		let string = 'x';

// 		for(let i=0; i<10000; i++){
// 			// console.log('--->', i);
// 			x++;
// 			for(let j=0; j<100; j++){
// 				// console.log('-------->',j);
// 				x++
// 				string+='x';
// 			}
// 		}

// 		message = JSON.parse(message);
// 		message.x = x;
// 		message.string = string.length;
// 		console.log('worker message: ', message);
// 		parentPort.postMessage({ pong: message });
// 		// setTimeout(() => {
// 		// 	parentPort.postMessage({ pong: message });
// 		// }, 5000);

// 		if(message.index > 9){
// 			// process.exit(0);
// 		}

// 	}
// );
