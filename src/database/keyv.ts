import Keyv from 'keyv';

const keyv = new Keyv();

keyv.on('error', (err) => console.log('Connection error', err));

export { keyv };
