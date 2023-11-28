function a(input) {
    // console.log(input);
    const packets = input.split('\n');
    packets.push('');
    let pair = [];
    let pairCt = 0;
    let sum = 0;
    packets.forEach(packet => {
        if (pair.length < 2) {
            pair.push(JSON.parse(packet));
        } else {
            pairCt++;
            // console.log(pair);
            sum += evaluatePair(pair, 0, pairCt);
            pair = [];
        }
    });
    console.log('sum: ', sum);
}

function b(input) {
    console.log(input);
}

function evaluatePair(pair, i, pairIndex) {
    // see if right or left are arrays
    // if they are not arrays compare the values
    // if they are arrays start comparing each val
    let l = pair[0];
    let r = pair[1];

    const areArrays = typeof pair[0] === 'object' || typeof pair[1] === 'object';
    console.log({
        areArrays,
        l,
        r
    });
    if (areArrays) {
        if (typeof pair[0] !== 'object') {
            l = [pair[0]];
        }
        if (typeof pair[1] !== 'object') {
            r = [pair[1]];
        }
        let evaluation = 0;
        while (l[i] || r[i]) {
            if (l[i]) {
                if (r[i]) {
                    console.log({
                        i,
                        evaluate: [l[i], r[i]]
                    });
                    evaluation = evaluatePair([l[i], r[i]], i, pairIndex);
                    console.log({
                        evaluation
                    });
                    if (evaluation > 0) {
                        return pairIndex;
                    } else {
                        i++;
                        // return 0;
                    }
                } else {
                    return pairIndex;
                }
            } else if (r[i]) {
                return 0;
            }
        }
        console.log('adding: ', pairIndex);
        return pairIndex;
    } else {
        if (l === r) {

        } else if (l < r) {
            return pairIndex
        }
        return 0;
    }
}

module.exports = {
    a,
    b
};