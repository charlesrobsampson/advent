function a(input) {
    const win = {
        X: 'C',// rock -> scissors
        Y: 'A',// paper -> rock
        Z: 'B'// scissors -> paper
    };
    const tie = {
        X: 'A',// rock -> rock
        Y: 'B',// paper -> paper
        Z: 'C'// scissors -> scissors
    };
    const vals = {
        X: 1,
        Y: 2,
        Z: 3
    };
    const rounds = input.split('\n');
    let score = 0;
    rounds.forEach(round => {
        const [elf, you] = round.split(' ');
        score += vals[you];
        if (elf === win[you]) {
            score += 6;
        } else if (elf === tie[you]) {
            score += 3;
        }
    });
    console.log(`score: ${score}`);
}

function b(input) {
    const lose = {
        A: 'C',// rock -> scissors
        B: 'A',// paper -> rock
        C: 'B'// scissors -> paper
    };
    const win = {
        C: 'A',// scissors -> rock
        A: 'B',// rock -> paper
        B: 'C'// paper -> scissors
    };
    const vals = {
        A: 1,
        B: 2,
        C: 3
    };
    const rounds = input.split('\n');
    let score = 0;
    rounds.forEach(round => {
        const [elf, outcome] = round.split(' ');
        if (outcome === 'X') {
            score += vals[lose[elf]];
        } else if (outcome === 'Y') {
            score += vals[elf] + 3;
        } else {
            score += vals[win[elf]] + 6;
        }
    });
    console.log(`score: ${score}`);
}

module.exports = {
    a,
    b
};