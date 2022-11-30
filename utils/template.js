const fs = require('fs');

const path = process.argv[1].split('/');
const day = path[path.length-1].split('.')[0];

const fn = `${__dirname}/input/${day}.txt`;

function a() {
    const input = fs.readFileSync(fn, 'utf-8');
    console.log('function a');
    console.log(input);
}

function b() {
    const input = fs.readFileSync(fn, 'utf-8');
    console.log('function b');
    console.log(input);
}




const funcs = {
    a,
    b
};
const func = process.argv[2];
if (func) {
    if (func === 'a' || func === 'b') {
        funcs[func]();
    } else {
        console.error(`invalid arg: '${func}' expected 'a' or 'b'`);
    }
} else {
    console.error('please specify if you want to run part a or b');
}