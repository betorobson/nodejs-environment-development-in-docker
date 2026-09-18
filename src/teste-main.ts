import { resolve } from 'node:path';

function main(): void {

    console.log('main funcionou');
    console.log(resolve(__dirname, '../package.json'));

}

main();
