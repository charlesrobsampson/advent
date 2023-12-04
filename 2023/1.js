const digits = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9'
}

function a(input) {
    const lines = input.split('\n');
    let total = 0;
    lines.forEach(line => {
        const first = getFirst(line);
        const last = getLast(line);
        total += Number(first + last);
    });
    console.log(`total: ${total}`);
}

function b(input) {
    const lines = input.split('\n');
    let total = 0;
    lines.forEach(line => {
        total += getBoth(line);
    });
    console.log(`total: ${total}`);}

function getFirst(line) {
    let first;
    let looking = true;
    let i = 0;
    while (looking) {
        if (isNaN(Number(line[i]))) {
            i++;
        } else {
            first = line[i];
            looking = false;
        }
        if (i > line.length) {
            first = -1;
            looking = false;

        }
    }
    return first
}

function getLast(line) {
    let i = line.length - 1;
    let looking = true;
    while (looking) {
        if (isNaN(Number(line[i]))) {
            i--;
        } else {
            last = line[i];
            looking = false;
        }
        if (i < 0) {
            last = -1;
            looking = false;
        }
    }
    return last;
}

function getBoth(line) {
    let nums = [];
    let str = '';
    for (let i = 0; i < line.length; i++) {
        if (isNaN(Number(line[i]))) {
            str += line[i];
            if (!isPartialDigit(str)) {
                str = str.substring(1);
                if (!isPartialDigit(str)) {
                    str = line[i];
                }
            } else if (digits[str]) {
                nums.push(digits[str]);
                str = line[i];
            }
        } else {
            str = '';
            nums.push(line[i]);
        }
    }
    const first = nums[0];
    const last = nums[nums.length - 1];
    return Number(`${first}${last}`);
}

function isPartialDigit(str) {
    d = Object.keys(digits);
    for (let i = 0; i < d.length; i++) {
        if (d[i].indexOf(str) != -1) {
            return true;
        }
    }
    return false;
}

module.exports = {
    a,
    b
};