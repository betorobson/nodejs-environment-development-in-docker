const {
	parentPort,
	workerData
} = require('worker_threads');

let jsonPack = require('../package.json');

let init = () => {
	run();
};

let run = () => {

	setTimeout(
		() =>
			parentPort.postMessage({
				workerData: workerData,
				dependencies: jsonPack.dependencies
			}),
		3000
	);

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
