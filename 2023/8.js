function a(input) {
    let data = input.split('\n');
    const inst = data[0];
    const nodes = mapNodes(data);
    let position = 'AAA';
    const steps = stepsToZ(position, inst, nodes);
    console.log(steps);
}

function b(input) {
    let data = input.split('\n');
    const inst = data[0];
    const nodes = mapWithStart(data);
    const steps = [];
    nodes.start.forEach(node => {
        steps.push(stepsToZ(node, inst, nodes));
    });

    console.log(leastCommonMultiple(steps));
}

function leastCommonMultiple(arr) {
    let min = arr[0];
    arr.forEach(num => {
        if (num < min) {
            min = num
        }
    })
    function gcd(a, b) {
        return !b ? a : gcd(b, a % b);
    }

    function lcm(a, b) {
        return (a * b) / gcd(a, b);   
    }

    var multiple = min;
    arr.forEach(function(n) {
        multiple = lcm(multiple, n);
    });

    return multiple;
}

function mapNodes(nodes) {
    const mapped = {};
    nodes.forEach(node => {
        if (node.indexOf('=') !== -1) {
            const [id, rl] = node.split(' = ');
            const [l, r] = rl.substring(1, rl.length-1).split(', ');
            mapped[id] = {
                L: l,
                R: r,
                class: id[id.length-1]
            };
        }
    });
    return mapped;
}

function mapWithStart(nodes) {
    const mapped = {
        start: []
    };
    nodes.forEach(node => {
        if (node.indexOf('=') !== -1) {
            const [id, rl] = node.split(' = ');
            const [l, r] = rl.substring(1, rl.length-1).split(', ');
            const clase = id[id.length-1];
            const classed = {
                L: l,
                R: r,
            };
            if (clase === 'A') {
                mapped.start.push(id);
            }
            mapped[id] = classed;
        }
    });
    return mapped;
}

function stepsToZ(start, inst, nodes) {
    let steps = 0;
    let looking = true;
    let position = start;
    const destination = 'Z';
    let i = 0;
    while (looking) {
        position = nodes[position][inst[i]];
        steps++;
        const clase = position[position.length - 1];
        if (clase === destination) {
            looking = false;
        } else {
            i++;
            if (i > inst.length - 1) {
                i -= inst.length;
            }
        }
    }
    return steps;
}

module.exports = {
    a,
    b,
};