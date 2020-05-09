const {
	Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

if(isMainThread){

	let getNewWorker = data => {

		let promise = new Promise((resolve, reject) => {

			const worker = new Worker(
				__filename, {workerData: data || {}}
			);

			worker.on('message', resolve);
			worker.on('error', reject);
			worker.on('exit', code => {
				if(code !== 0){
					reject(new Error(`Worker exit with code ${code}`));
				}
			});

		});

		return promise;

	};

	module.exports = {
		getNewWorker: getNewWorker
	};

}else{

	let workerPromises = [];

	let totalWorkers = workerData.totalWorkers || 1;

	for(let i=0; i<totalWorkers; i++){
		workerPromises.push(
			new Promise((resolve, reject) => {

				let x = 0;
				let string = 'x';

				for(let i=0; i<10000; i++){
					// console.log('--->', i);
					x++;
					for(let j=0; j<100; j++){
						// console.log('-------->',j);
						x++
						string+='x';
					}
				}

				resolve({
					workerData: workerData,
					message: ' from worker.postMessage',
					x: x,
					string: string.length
				});

			})
		);
	}

	Promise.all(workerPromises)
		.then(results => parentPort.postMessage(results))
		.catch(error => parentPort.postMessage(error));

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

}
