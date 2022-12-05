function a(input) {
    const d = input.split('\n');
    const {
        stacks,
        instructions
    } = foramt(d);

    instructions.forEach(instruction => {
        for (let i = 0; i < instruction.qty; i++) {
            let fromStack = stacks[instruction.from];
            let toStack = stacks[instruction.to];
            toStack.push(fromStack.pop());
            stacks[instruction.from] = fromStack;
            stacks[instruction.to] = toStack;
        }
    });
    const stackNames = Object.keys(stacks);
    console.log(`message: ${stackNames.map(sname => {
        return stacks[sname].pop();
    }).join('')}`);
}

function b(input) {
    const d = input.split('\n');
    const {
        stacks,
        instructions
    } = foramt(d);

    instructions.forEach(instruction => {
        let fromStack = stacks[instruction.from];
        let toStack = stacks[instruction.to];
        toStack.push(...fromStack.splice(-instruction.qty, instruction.qty));
        stacks[instruction.from] = fromStack;
        stacks[instruction.to] = toStack;
    });
    const stackNames = Object.keys(stacks);
    console.log(`message: ${stackNames.map(sname => {
        return stacks[sname].pop();
    }).join('')}`);
}

function foramt(d) {
    let stacks = [];
    let i = 0;
    while (d[i].indexOf('1') === -1) {
        stacks.push(d[i].split(''));
        i++
    }
    stacks.push(d[i].split(''));
    const s = {};
    let stackname;
    let stackindex = -1;
    for (let y = 0; y < stacks[0].length; y++) {
        let cols = [];
        stackname = '';
        for (let x = stacks.length - 1; x >= 0; x--) {
            if (!isNaN(+stacks[x][y]) && stacks[x][y] !== ' ') {
                stackname = stacks[x][y];
                stackindex = y;
            } else if (y === stackindex && stacks[x][y] !== ' ') {
                cols.push(stacks[x][y])
            }
        }
        if (cols.length > 0) {
            s[stackname] = cols;
            stackindex = -1;
        }
    }
    const instr = d.slice(i+2);
    const instructions = instr.map(line => {
        line = line.replace('move ', '');
        const [qty, moves] = line.split(' from ');
        const [from, to] = moves.split(' to ');
        return {
            qty: +qty,
            from,
            to
        }
    });
    return {
        stacks: s,
        instructions
    };
}

module.exports = {
    a,
    b
};