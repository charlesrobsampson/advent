function a(input) {
    const motions = input.split('\n');
    const positions = getTailPositions(motions);
    // console.log(positions);
    console.log('positions: ', Object.keys(positions).length);

}

function b(input) {
    // console.log(input);
    const motions = input.split('\n');
    let rope = initializeRope(10);
    // console.log(rope);
    let positions = {
        '0,0': 0
    };
    let head = [0,0];
    motions.forEach(motion => {
        const [dir, ct] = motion.split(' ');
        for (let i = 0; i < ct; i++) {
            const was = [head[0], head[1]];
            if (dir === 'R') {
                head[0]++;
            } else if (dir === 'L') {
                head[0]--;
            } else if (dir === 'U') {
                head[1]++;
            } else if (dir === 'D') {
                head[1]--;
            }
            rope[0].pos = head;
            // console.log({
                // i: 0,
                // head,
                // was
            // });
            rope = moveRope(rope, 1, was);
            const pos = rope[rope.length - 1].pos.join(',');
            console.log(pos);
            if (positions[pos]) {
                positions[pos]++;
            } else {
                positions[pos] = 1;
            }
        }
    });
    // console.log(positions);
    console.log('positions: ', Object.keys(positions).length);
}

function getTailPositions(motions) {
    let positions = {
        '0,0': 1
    };
    let head = [0,0];
    let tail = [0,0];
    motions.forEach(motion => {
        const [dir, ct] = motion.split(' ');
        for (let i = 0; i < ct; i++) {
            const was = [head[0], head[1]];
            if (dir === 'R') {
                head[0]++;
            } else if (dir === 'L') {
                head[0]--;
            } else if (dir === 'U') {
                head[1]++;
            } else if (dir === 'D') {
                head[1]--;
            }
            if (Math.abs(head[0] - tail[0]) > 1 || Math.abs(head[1] - tail[1]) > 1) {
                tail = was;
            }
            const pos = tail.join(',');
            if (positions[pos]) {
                positions[pos]++;
            } else {
                positions[pos] = 1;
            }
        }
    });
    return positions;
}

function initializeRope(knots) {
    let rope = [];
    for (let i = 0; i < knots; i++) {
        rope.push({
            knot: i,
            pos: [0,0]
        });
    }
    return rope;
}

function moveRope(rope, i, was) {
    // console.log({
    //     prev: rope[i-1],
    //     this: rope[i]
    // });
    const prev = [...rope[i-1].pos];
    const knot = [...rope[i].pos];
    // console.log({
    //     i,
    //     prev,
    //     knot,
    //     was
    // });
    if (Math.abs(prev[0] - knot[0]) > 1 || Math.abs(prev[1] - knot[1]) > 1) {
        rope[i].pos = [...was];
    }
    if (i === rope.length - 1) {
        return rope;
    } else {
        return moveRope(rope, i + 1, knot);
    }
}

module.exports = {
    a,
    b
};