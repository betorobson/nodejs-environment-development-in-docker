import { pino } from 'pino';
import pinoHttp from 'pino-http';
import express from 'express';

const app = express();
app.listen(3001);

const Router = express.Router();

pino().info(`
	All good 🕺
	Running on port 3001
`);

app.use(express.json({strict: true}));

const httpLogger = pinoHttp({ logger: pino() });
app.use(httpLogger);

app.use(
	Router.get(
		'/',
		(req, res, next) => {

			res.json({message: 'Hello Typescript'});

			// let result = 2;

			// let p1 = () => new Promise(
			// 	(resolve, reject) => {
			// 		if(result == 1){
			// 			resolve('it works 1');
			// 		}else{
			// 			reject(new Error('it fails 1'));
			// 		}
			// 	}
			// );

			// let p2 = () => new Promise(
			// 	(resolve, reject) => {
			// 		if(result <= 2){
			// 			resolve('it works 2');
			// 		}else{
			// 			reject(new Error('it fails 2'));
			// 		}
			// 	}
			// );

			// let promises = [p1, p2];

			// let getErrorMessage = result => {
			// 	if(result.reason){
			// 		result.reason = result.reason.message;
			// 	}
			// 	return result;
			// };

			// let initAsyncTasks = () => {
			// 	Promise.allSettled(promises.map(promise => promise()))
			// 		.then(results => responseResults(
			// 			// WTF? kkkkkkkkkkk
			// 			Object.fromEntries(
			// 				promises.map(
			// 					(promise, index) =>
			// 						[
			// 							promise.name,
			// 							getErrorMessage(results[index])
			// 						]
			// 					)
			// 			)
			// 		));
			// };

			// let responseResults = results => res.json(results);

			// initAsyncTasks();

		}
	)
);
