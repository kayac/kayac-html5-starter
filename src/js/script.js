import { BASE_DIR } from '../constants.yml'
import Sample from '@/lib/Sample';

const sample = new Sample({
    name: 'Hello World'
});

document.querySelector('.wrapper').addEventListener('click', () => {
    console.log(`hello, ${sample.name}. Base directory is ${BASE_DIR}.`);
});
