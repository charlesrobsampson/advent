function a(input) {
    let rows = input.split('\n');
    const almanac = createAlamanc(rows);
    let location = -1;
    almanac.seeds.forEach(seed => {
        const val = convert(almanac, seed, 'seed', 'location');
        if (location > 0) {
            if (val < location) {
                location = val;
            }
        } else {
            location = val;
        }
    });
    console.log(location);
}

function b(input) {
let rows = input.split('\n');
const almanac = createAlamanc(rows);
let location = -1;
const seeds = almanac.seeds
for (let i = 0; i < seeds.length; i += 2) {
    const startSeed = seeds[i];
    const checkSeeds = seeds[i+1];
    for (let s = 0; s < checkSeeds; s++) {
        // I didn't like doing it this way, but I figured I could just let it
        // run till I found a better solution... but then it finished so :shrug:
        const seed = startSeed + s;
        const val = convert(almanac, seed, 'seed', 'location');
        if (location > 0) {
            if (val < location) {
                location = val;
            }
        } else {
            location = val;
        }
    }
}

console.log(location);}

function convert(almanac, initial, source, destination) {
    const {val, unit} = almanac.maps[source].map(initial);
    if (unit === destination) {
        return val
    }
    return convert(almanac, val, unit, destination);
}

function createAlamanc(rows) {
    let seeds = [];
    const maps = {};
    let currentMap = '';
    let chunk = [];
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].indexOf('seeds:') !== -1) {
            const [ , s] = rows[i].split(': ');
            seeds = s.split(' ').map(seed => {
                return Number(seed);
            });
        } else if (rows[i].indexOf('map:') !== -1) {
            const [title, ] = rows[i].split(' ');
            if (chunk.length > 0 && currentMap !== '') {
                chunk.pop();
                const newMap = makeMap(currentMap, chunk);
                maps[newMap.name] = {
                    map: newMap.func
                };
            }
            currentMap = title;
            chunk = [];
        } else {
            chunk.push(rows[i]);
        }
    }
    const newMap = makeMap(currentMap, chunk);
    maps[newMap.name] = {
        map: newMap.func
    };
    return {
        seeds,
        maps,
    };
}

function makeMap(title, range) {
    const [source, destination] = title.split('-to-');
    const ranges = range.map(r => {
        const [ destination, source, len] = r.split(' ');
        return {
            destination: Number(destination),
            source: Number(source),
            len: Number(len)
        }
    });
    const func = (val) => {
        for (let i = 0; i < ranges.length; i++) {
            if (val >= ranges[i].source && val < ranges[i].source + ranges[i].len) {
                const diff = val - ranges[i].source;
                return {
                    val: ranges[i].destination + diff,
                    unit: destination
                };
            }
        }
        return {
            val,
            unit: destination
        };
    }
    return {
        name: source,
        func,
        map: {
            source,
            destination,
            ranges,
        }
    };
}

module.exports = {
    a,
    b
};