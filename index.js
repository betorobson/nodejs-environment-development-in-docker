// const { Worker, parentPort } = require('worker_threads');
const express = require('express');
const axios = require('axios');
const router = express.Router();
const logger = require('pino')();
const pinoHttp = require('pino-http')({
	logger: logger
});

const { startNewWorker } = require('./workers');

const app = express();

// app.use(pinoHttp);
app.listen(3001);

logger.info(`
	All good 🕺
	Running on port 3001
`);

app.use(
	router.get(
		'/',
		(req, res, next) => {

			let result = 2;

			let p1 = () => new Promise(
				(resolve, reject) => {
					if(result == 1){
						resolve('it works 1');
					}else{
						reject(new Error('it fails 1'));
					}
				}
			);

			let p2 = () => new Promise(
				(resolve, reject) => {
					if(result <= 2){
						resolve('it works 2');
					}else{
						reject(new Error('it fails 2'));
					}
				}
			);

			let promises = [p1, p2];

			let getErrorMessage = result => {
				if(result.reason){
					result.reason = result.reason.message;
				}
				return result;
			};

			let initAsyncTasks = () => {
				Promise.allSettled(promises.map(promise => promise()))
					.then(results => responseResults(
						// WTF? kkkkkkkkkkk
						Object.fromEntries(
							promises.map(
								(promise, index) =>
									[
										promise.name,
										getErrorMessage(results[index])
									]
								)
						)
					));
			};

			let responseResults = results => res.json(results);

			initAsyncTasks();

		}
	)
);

// let loop = () => {

// 	return new Promise((resolve, reject) => {

// 		let limitI = 5;
// 		let limitJ = 2;

// 		let loop1 = (i = 0) => {

// 			console.log('----> i = ', i);

// 			let loop2 = (i, j = 0) => {
// 				console.log('---------> i = ', i, ' --- j = ', j);
// 				if(j<limitJ){
// 					return setTimeout(() => loop2(i, ++j), 1000);
// 				}else if(i==limitI && j==limitJ){
// 					resolve();
// 				}
// 			};
// 			loop2(i);

// 			if(i<limitI){
// 				return setTimeout(() => loop1(++i), 1000);
// 			}

// 		};

// 		loop1();

// 	});

// };

app.use(
	router.get(
		'/test1/:totalworkers?',
		(req, res, next) => {

			let totalWorkers = req.params.totalworkers || 5;

			if(totalWorkers > 200){
				totalWorkers = 5;
			}

			let worker = startNewWorker({
				file: '/worker-1/worker.js',
				data: {
					totalWorkers: totalWorkers
				}
			});

			worker
				.then(result => res.json(result))
				.catch(error => res.status(500).json({
					message: error.message,
					stack: error.stack.split('\n')
				}));

			// let workerCallback = message => {
			// 	console.log('callback work: ', message);
			// 	res.json({test1: 'ok', message});
			// };

			// worker.on('message', workerCallback);
			// worker.on('error', error => res.status(500).json(error));
			// worker.on('exit', (exitCode) => {

			// 	if(exitCode === 0) {
			// 		return null;
			// 	}else{
			// 		res.status(500)
			// 		.json({error: `Worker stopped with exit code ${exitCode}`});
			// 	}

				// return;

			// });

			// worker.postMessage(JSON.stringify({
			// 	index: 1,
			// 	message: 'test worker'
			// }));

		}
	)
);

app.use(
	router.get(
		'/test2',
		(req, res, next) => {

			let worker = startNewWorker({
				file: '/worker-1/worker.js',
				data: {
					totalWorkers: 2
				}
			});

			worker
				.then(result => res.json(result))
				.catch(error => res.status(500).json({
					message: error.message,
					stack: error.stack.split('\n')
				}));

		}
	)
);

app.use(
	router.get(
		'/test3',
		(req, res, next) => {

			axios({
				method: 'get',
				url: 'http://app2slow:3002/',
			})
				.then(function (response) {
					res.json(response.data);
				})
				.catch(error => res.status(500).json(error));

		}
	)
);

app.use(
	router.get(
		'/test4',
		(req, res, next) => {

			let workerA = startNewWorker({
				file: '/worker-1/worker.js',
				data: {
					totalWorkers: 2
				}
			});

			let workerB = startNewWorker({
				file: '/worker-2/worker.js',
				data: {
					somedata: {
						a:1,
						b:2
					}
				}
			});

			Promise.all([
				workerA,
				workerB
			])
				.then(result => res.json(result))
				.catch(error => res.status(500).json({
					message: error.message,
					stack: error.stack.split('\n')
				}));

		}
	)
);

app.use(
	router.get(
		'/block-event-loop',
		(req, res, next) => {

			// let x = 0;
			// let string = '';
			// for(let i=0; i<1000; i++){
			// 	// console.log('--->', i);
			// 	x++;
			// 	for(let j=0; j<50; j++){
			// 		console.log('-------->', x);
			// 		// logger.info('--------> ' + x);
			// 		x++
			// 		string+='x';
			// 	}
			// }

			let current = new Date();
			let stopAt = new Date();
			stopAt.setSeconds(stopAt.getSeconds() + 10);
			let stopAtTimestamp = stopAt.getTime();

			while(new Date().getTime() < stopAtTimestamp){
				let any = new Date().getTime();
			}

			res.json({
				message: 'ok it blocks the event loop',
				start: current,
				stop: stopAt
			});


		}
	)
);
