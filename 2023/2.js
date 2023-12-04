function a(input) {
    const rules = {
        red: 12,
        green: 13,
        blue: 14
    };
    let total = 0;
    const games = input.split('\n');
    games.forEach(g => {
        const game = parseGame(g);
        if (isValidGame(game, rules)) {
            total += game.id;
        }
    });
    console.log(total);
}

function b(input) {
    let total = 0;
    const games = input.split('\n');
    games.forEach(g => {
        const game = parseGame(g);
        const required = getPower(game);
        total += required
    });
    console.log(total);
}

function parseGame(game) {
    const [gameId, gameStats] = game.split(':');
    const [ , id] = gameId.split(' ');
    const sets = gameStats.split(';');
    const g = {
        id: Number(id),
        sets: []
    };
    sets.forEach(set => {
        const cubes = set.split(',');
        const cubeList = [];
        cubes.forEach(cube => {
            const [ , val, color] = cube.split(' ');
            cubeList.push({
                color,
                qty: Number(val)
            });
        });
        g.sets.push(cubeList);
    });
    return g;
}

function isValidGame(game, rules) {
    for (let i = 0; i < game.sets.length; i++) {
        const set = game.sets[i];
        for (let j = 0; j < set.length; j++) {
            const cube = set[j];
            if (cube.qty > rules[cube.color]) {
                return false;
            }
        }
    }
    return true;
}

function getPower(game) {
    const required = minRequired(game);
    return Object.values(required).reduce((acc, value) => {
        return acc * value;
    }, 1);

}

function minRequired(game) {
    const required = {};
    for (let i = 0; i < game.sets.length; i++) {
        const set = game.sets[i];
        for (let j = 0; j < set.length; j++) {
            const cube = set[j];
            if (required[cube.color]) {
                if (cube.qty > required[cube.color]) {
                    required[cube.color] = cube.qty;
                }
            } else {
                required[cube.color] = cube.qty;
            }
        }
    }
    return required;
}

module.exports = {
    a,
    b
};