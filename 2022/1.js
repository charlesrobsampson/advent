function a(input) {
    const items = input.split('\n');
    let max = 0;
    let cals = 0;
    items.forEach((item) => {
        const calories = Number(item);
        if (calories === 0) {
            if (cals > max) {
                max = cals;
            }
            cals = 0;
        } else {
            cals += Number(item);
        }
    });
    console.log(`Max calories: ${max}`);
}

function b(input) {
    const items = input.split('\n');
    items.push(0);
    let max = [
        0,
        0,
        0
    ];
    let cals = 0;
    items.forEach((item) => {
        const calories = Number(item);
        if (calories === 0) {
            if (cals > max[0]) {
                max[2] = max [1];
                max[1] = max [0];
                max[0] = cals;
            } else if (cals > max[1]) {
                max[2] = max [1];
                max[1] = cals;
            } else if (cals > max[2]) {
                max[2] = cals;
            }
            cals = 0;
        } else {
            cals += Number(item);
        }
    });
    console.log(`Max calories: ${max.reduce((a, b) => {
        return a+ b;
    })}`);}

module.exports = {
    a,
    b
};