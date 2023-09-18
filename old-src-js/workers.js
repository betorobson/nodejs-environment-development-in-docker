const {
	Worker
} = require('worker_threads');

let startNewWorker = attrs => {

	let promise = new Promise((resolve, reject) => {

		if(!attrs.file){
			throw new Error('Missing file parameter in data');
		}

		const worker = new Worker(
			__dirname + '/' + attrs.file,
			{workerData: attrs.data || {}}
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
	startNewWorker
};
