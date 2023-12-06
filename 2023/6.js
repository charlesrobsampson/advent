function a(input) {
    const data = input.replace(/\s{2,}/g, ' ').split('\n');
    const times = data[0].split(': ')[1].split(' ');
    const distances = data[1].split(': ')[1].split(' ');
    const races = times.length;
    let product = 1;
    for (let r = 0; r < races; r++) {
        const duration = Number(times[r]);
        const record = Number(distances[r]);
        let winningHolds = 0;
        for (let i = 1; i < duration; i++) {
            const d = distance(duration, i);
            if (d > record) {
                winningHolds++;
            }
        }
        product *= winningHolds;
    }
    console.log(product);
}

function b(input) {
    const data = input.replace(/\s{2,}/g, '').split('\n');
    const time = Number(data[0].split(':')[1]);
    const dist = Number(data[1].split(':')[1]);
    let winningHolds = 0;
    for (let i = 1; i < time; i++) {
        const d = distance(time, i);
        if (d > dist) {
            winningHolds++;
        }
    }
    console.log(winningHolds);
}

function b2(input) {
    const data = input.replace(/\s{2,}/g, '').split('\n');
    const time = Number(data[0].split(':')[1]);
    const dist = Number(data[1].split(':')[1]);
    const bs = bounds(time, dist);
    const diff = bs[1] - bs[0];
    console.log(diff);
}

function distance(duration, hold) {
    return hold * (duration - hold);
}

function bounds(t, d) {
    const b1 = Math.floor((-t + Math.sqrt(t*t - 4*d)) / -2);
    const b2 = Math.floor((-t - Math.sqrt(t*t - 4*d)) / -2);
    return [b1, b2].sort((a, b) => a - b);
}

module.exports = {
    a,
    b,
    b2
};