function a(input) {
    const instructions = input.split('\n');
    let x = 1;
    let cycles = 0;
    let sum = 0;
    instructions.forEach((instruction) => {
        if (instruction === 'noop') {
            cycles++
            sum = evaluateCycle(x, cycles, sum);
        } else {
            const val = instruction.split(' ');
            cycles++;
            sum = evaluateCycle(x, cycles, sum);
            cycles++;
            sum = evaluateCycle(x, cycles, sum);
            x += +val[1];
        }
    });
    console.log('sum: ', sum);
}

function b(input) {
    const instructions = input.split('\n');
    let x = 1;
    let cycles = 0;
    let line = '';
    instructions.forEach((instruction) => {
        if (instruction === 'noop') {
            cycles++
            line = evaluateLine(x, cycles, line);
        } else {
            const val = instruction.split(' ');
            cycles++;
            line = evaluateLine(x, cycles, line);
            cycles++;
            line = evaluateLine(x, cycles, line);
            x += +val[1];
        }
    });
}

function evaluateCycle(x, cycle, sum) {
    const important = [
        20,
        60,
        100,
        140,
        180,
        220
    ];
    if (important.indexOf(cycle) !== -1) {
        return sum + (cycle * x);
    } else {
        return sum;
    }
}

function evaluateLine(x, cycle, line) {
    const pos = cycle - 1;
    // console.log({
    //     cycle,
    //     x
    // });
    if (pos % 40 >= x - 1 && pos % 40 <= x + 1) {
        line += '#';
    } else {
        line += ' ';
    }
    if (cycle % 40 === 0) {
        console.log(line);
        line = '';
    }
    // console.log(line);
    return line;
}

module.exports = {
    a,
    b
};