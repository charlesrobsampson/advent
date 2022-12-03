function a(input) {
    const sacks = input.split('\n');
    const priorities = {};
    sacks.forEach(sack => {
        const c1 = sack.substr(0, sack.length / 2);
        const c2 = sack.substring(sack.length / 2);
        let chars1 = {};
        let chars2 = {};
        for (let i = 0; i < c1.length; i++) {
            chars1[c1[i]] = true;
            chars2[c2[i]] = true;
        }
        const chars = Object.keys(chars1);
        let i = 0;
        let loop = true;
        while (loop) {
            if (chars2[chars[i]]) {
                loop = false;
                if (priorities[chars[i]]) {
                    priorities[chars[i]]++;
                } else {
                    priorities[chars[i]] = 1;
                }
            }
            i++;
        }
    });
    let total = 0;
    for (const l in priorities) {
        let val = l.charCodeAt(0) - 96;
        if (val < 0) {
            val = val + 58
        }
        total += val * priorities[l];
    }
    console.log(`total: ${total}`);
}

function b(input) {
    const sacks = input.split('\n');
    const priorities = {};
    for (let i = 0; i < sacks.length / 3; i++) {
        const c1 = sacks[i * 3];
        const c2 = sacks[(i * 3) + 1];
        const c3 = sacks[(i * 3) + 2];
        let chars1 = {}
        let chars2 = {}
        let chars3 = {}
        for (let c = 0; c < c1.length; c++) {
            chars1[c1[c]] = true;
        }
        for (let c = 0; c < c2.length; c++) {
            chars2[c2[c]] = true;
        }
        for (let c = 0; c < c3.length; c++) {
            chars3[c3[c]] = true;
        }
        const chars = Object.keys(chars1);
        let j = 0;
        let loop = true;
        while (loop) {
            if (chars2[chars[j]] && chars3[chars[j]]) {
                loop = false;
                if (priorities[chars[j]]) {
                    priorities[chars[j]]++;
                } else {
                    priorities[chars[j]] = 1;
                }
            }
            j++;
        }
    }
    let total = 0;
    for (const l in priorities) {
        let val = l.charCodeAt(0) - 96;
        if (val < 0) {
            val = val + 58
        }
        total += val * priorities[l];
    }
    console.log(`total: ${total}`);
}

module.exports = {
    a,
    b
};