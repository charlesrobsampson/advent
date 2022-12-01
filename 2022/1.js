const fs = require('fs');

const path = process.argv[1].replace(/\\/g, '/').split('/');
const day = path[path.length-1].split('.')[0];

const fn = `${__dirname.replace(/\\/g, '/')}/input/${day}.txt`;

function a() {
    const input = fs.readFileSync(fn, 'utf-8');
    console.log(`day${day} part a`);
    const items = input.split('\n');
    let max = 0;
    let cals = 0;
    items.forEach((item) => {
        const calories = Number(item);
        if (calories === 0) {
            if (cals > max) {
                max = cals;
            }
            cals = 0;
        } else {
            cals += Number(item);
        }
    });
    console.log(`Max calories: ${max}`);
}

function b() {
    const input = fs.readFileSync(fn, 'utf-8');
    console.log(`day${day} part b`);
    const items = input.split('\n');
    items.push(0);
    let max = [
        0,
        0,
        0
    ];
    let cals = 0;
    items.forEach((item) => {
        const calories = Number(item);
        if (calories === 0) {
            if (cals > max[0]) {
                max[2] = max [1];
                max[1] = max [0];
                max[0] = cals;
            } else if (cals > max[1]) {
                max[2] = max [1];
                max[1] = cals;
            } else if (cals > max[2]) {
                max[2] = cals;
            }
            cals = 0;
        } else {
            cals += Number(item);
        }
    });
    console.log(`Max calories: ${max.reduce((a, b) => {
        return a+ b;
    })}`);}




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