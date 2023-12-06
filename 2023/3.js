const symbols = {
    '*': true,
    '-': true,
    '#': true,
    '/': true,
    '=': true,
    '%': true,
    '$': true,
    '&': true,
    '@': true,
    '+': true
};
function a(input) {
    let rows = input.split('\n');
    let nums = [];
    let total = 0;
    const schmatic = makeSchematic(rows);
    for (let r = 0; r < schmatic.length; r++) {
        const row = schmatic[r];
        for (let c = 0; c < row.length; c++) {
            const val = row[c];
            if (symbols[val]) {
                nums.push(...partNumbers(schmatic, r, c, []));
            }
        }
    }
    nums.forEach(num => {
        total += Number(num);
    });
    console.log(total);
}

function b(input) {
    let rows = input.split('\n');
    let nums = [];
    let total = 0;
    const schmatic = makeSchematic(rows);
    for (let r = 0; r < schmatic.length; r++) {
        const row = schmatic[r];
        for (let c = 0; c < row.length; c++) {
            const val = row[c];
            if (val === '*') {
                nums.push(gearRatio(schmatic, r, c));
            }
        }
    }
    nums.forEach(num => {
        total += num;
    });
    console.log(total);
}

function makeSchematic(rows) {
    const schematic = [];
    for (let i = 0; i < rows.length; i++) {
        const row = [];
        for (let j = 0; j < rows[i].length; j++) {
            row.push(rows[i][j]);
        }
        schematic.push(row);
    }
    return schematic
}

function partNumbers(schmatic, r, c) {
    const nums = [];
    for (let ro = -1; ro <= 1; ro++) {
        for (let co = -1; co <= 1; co++) {
            if (schmatic[r+ro]){
                const val = schmatic[r+ro][c+co];
                if (val && !isNaN(Number(val)) && val !== ' ') {
                    schmatic[r+ro][c+co] = ' ';
                    nums.push(getNumber(schmatic, r+ro, c+co-1, c+co+1, val));
                }
            }
        }
    }
    return nums;
}

function gearRatio(schmatic, r, c) {
    const nums = [];
    for (let ro = -1; ro <= 1; ro++) {
        for (let co = -1; co <= 1; co++) {
            if (schmatic[r+ro]){
                const val = schmatic[r+ro][c+co];
                if (val && !isNaN(Number(val)) && val !== ' ') {
                    schmatic[r+ro][c+co] = ' ';
                    nums.push(getNumber(schmatic, r+ro, c+co-1, c+co+1, val));
                }
            }
        }
    }
    if (nums.length === 2) {
        return Number(nums[0]) * Number(nums[1]);
    }
    return 0;
}

function getNumber(schmatic, r, b, f, num) {
    if (!isNaN(Number(schmatic[r][b])) && schmatic[r][b] !== ' ') {
        num = schmatic[r][b] + num;
        schmatic[r][b] = ' ';
        num = getNumber(schmatic, r, b-1, f, num);
    }
    if (!isNaN(Number(schmatic[r][f])) && schmatic[r][f] !== ' ') {
        num = num + schmatic[r][f];
        schmatic[r][f] = ' ';
        num = getNumber(schmatic, r, b, f+1, num);
    }
    return num;
}

module.exports = {
    a,
    b
};