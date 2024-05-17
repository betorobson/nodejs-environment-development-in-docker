import { pino } from 'pino';
import pinoHttp from 'pino-http';
import express, { Response } from 'express';
import teste from './t';
import { methodGET } from './helpers/api-response';
import { testeFromTS } from './helpers/teste';
import { startNewWorker } from './helpers/workers';
// import { Worker } from 'worker_threads';

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

type DefaultResponseBody<JSON_BODY = any> = Response & {
    jsonBody?: JSON_BODY;
}

type MyPayloadBody = {
    id: number;
    data: any;
}

type MyResponseBody = DefaultResponseBody<{teste: string, data: any}>;

app.use(methodGET);

app.use(
    Router.get<null, any, MyPayloadBody>(
        '/',
        (request, response: MyResponseBody) => {

            response.jsonBody = {
                teste: 'Hello',
                data: {
                    id: 123,
                    testeFromTS: testeFromTS(),
                    teste: teste()
                }
            };

            response.json(response.jsonBody);

        }
    )
);

app.use(
    Router.get(
        '/worker/:queryString_seconds',
        (request, response) => {

            // try {
            //     const { queryString_seconds = 1 } = request.params;
            //     // eslint-disable-next-line prefer-template
            //     const worker = new Worker(__dirname + '/teste1.worker', {
            //         execArgv: ['-r', 'ts-node/register/transpile-only'],
            //         workerData: {
            //             seconds: queryString_seconds,
            //             data: {a: 445566}
            //             // path: './worker.ts'
            //         }
            //     });

            //     worker.on('message', result => {
            //         response.json(result);
            //     });
            // }catch(error){
            //     response.json(error);
            // }

            startNewWorker({
                file: `${__dirname}/teste1.worker`,
                data: {
                    seconds: request.params.queryString_seconds,
                }
            }).then(result => {
                response.json({
                    workerResult: result
                });
            }).catch(error => {
                response.json({
                    message: 'worker error',
                    error
                });
            });

        }
    )
);

// eslint-disable-next-line prefer-template
// const worker = new Worker(__dirname + '/teste1.worker', {
//     execArgv: ['-r', 'ts-node/register/transpile-only'],
//     workerData: {
//         content: {b: 554433}
//     }
// });

// worker.on('message', result => {
//     console.log(result);
// });
