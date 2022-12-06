function a(input) {
    const chars = input.split('');
    const first = getFirstObject(chars, 4);
    console.log(`first packet at: ${first}`);
}

function b(input) {
    const chars = input.split('');
    const first = getFirstObject(chars, 14);
    console.log(`first message at: ${first}`);
}

function getFirstObject(chars, limit) {
    let lastchars = [];
    let letters = {};
    let found = false;

    for(let i = 0; i < chars.length; i++) {
        const c = chars[i];
        lastchars.push(c);
        if (letters[c]) {
            letters[c]++;
        } else {
            letters[c] = 1;
        }
        if (lastchars.length === limit + 1) {
            const remove = lastchars.splice(0,1);
            if (letters[remove] === 1) {
                delete letters[remove];
            } else {
                letters[remove]--;
            }
        }
        const total = Object.keys(letters).length;
        if (total === limit) {
            found = i;
            return i + 1;
        }
    }
}

module.exports = {
    a,
    b
};