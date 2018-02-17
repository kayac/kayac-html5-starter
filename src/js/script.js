import Sample from './lib/Sample';

const sample = new Sample({
    name: 'world'
});

$('.wrapper').on('click', () => {
    console.log(`hello, ${sample.name}.`);
});
