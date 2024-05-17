import { parentPort, workerData } from 'worker_threads';
import { anyModule } from './teste1.anymodule';

if(workerData.seconds === 'error'){
    const x: any = {a: null};

    x.a.z = 2;
}

let milliseconds = (workerData.seconds || 2) * 1000;

milliseconds = milliseconds > 15000 ? 2000 : milliseconds;


setTimeout(() => {
    parentPort?.postMessage({
        messageFromWorker: 'it works!',
        value: anyModule.getValue(),
        workerData,
        milliseconds
    });
}, milliseconds);

