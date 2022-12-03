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
    let group = {};
    for (let i = 0; i < sacks.length; i++) {
        const g = i % 3;
        if (g === 0) {
            group = {};
        }

        const sack = sacks[i];
        let letters = {};
        for (let l = 0; l < sack.length; l++) {
            letters[sack[l]] = true;            
        }
        group[g] = letters;

        if (g == 2) {
            const chars = Object.keys(group[0]);
            let j = 0;
            let loop = true;
            while (loop) {
                if (group[1][chars[j]] && group[2][chars[j]]) {
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