const { time } = require('console');
const fs = require('fs');
const year = process.argv[2];
const day = process.argv[3];
const part = process.argv[4] || false;
const example = process.argv[5] || false;

const dayToRun = require(`./${year}/${day}`);
const fn = `${__dirname.replace(/\\/g, '/')}/${year}/input/${day}${example ? 'e' : ''}.txt`;
const input = fs.readFileSync(fn, 'utf-8').replace(/\r/g, '');

let parts = Object.keys(dayToRun);
if (part) {
    if (parts.indexOf(part) === -1) {
        console.error(`part '${part}' not found. expected '${parts.join("', '")}'`);
        parts = [];
    } else {
        parts = [part];
    }
}
parts.forEach((p) => {
    console.log(`\nRunning ${year}/${day} part ${p}${example ? ' example input' : ''}`);
    console.log('-----------------------');
    console.time('runtime');
    dayToRun[p](input);
    console.log('-----------------------');
    console.timeEnd('runtime');
});
