const {
    Worker
} = require('worker_threads');

const getWorker = attrs => {

    if(!attrs.file){
        throw new Error('Missing file parameter in data');
    }

    const worker = new Worker(
        attrs.file,
        {
            execArgv: ['-r', 'ts-node/register/transpile-only'],
            workerData: attrs.data || {}
        }
    );

    return worker;

};

const startNewWorker = attrs => {

    const promise = new Promise((resolve, reject) => {

        const worker = getWorker(attrs);

        worker.on('message', resolve);
        worker.on('error', error => {
            // console.log('error:', error);
            // console.log('message:', error.message);
            // console.log('stack', error.stack);
            reject({
                message: error.message,
                // stack: error.stack?.split('\n')
            });
        });
        worker.on('exit', code => {
            if(code !== 0){
                reject(new Error(`Worker exit with code ${code}`));
            }
        });

    });

    return promise;

};

module.exports = {
    startNewWorker,
    getWorker
};
