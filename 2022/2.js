const fs = require('fs');

const path = process.argv[1].replace(/\\/g, '/').split('/');
const day = path[path.length-1].split('.')[0];

const fn = `${__dirname.replace(/\\/g, '/')}/input/${day}.txt`;

function a() {
    const input = fs.readFileSync(fn, 'utf-8');
    console.log(`day ${day} part ${arguments.callee.name}`);
    console.log(input);
}

function b() {
    const input = fs.readFileSync(fn, 'utf-8');
    console.log(`day ${day} part ${arguments.callee.name}`);
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
    for (const func in funcs) {
        funcs[func]();
    }
}