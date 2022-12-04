function a(input) {
    const sets = input.split('\n');
    let overlaps = 0;
    sets.forEach(s => {
        const elves = s.split(',');
        let sections = {};
        elves.forEach((elf, i) => {
            const [start, end] = elf.split('-');
            sections[i] = {
                start: Number(start),
                end: Number(end)
            };
        });
        if (sections[0].start === sections[1].start || sections[0].end === sections[1].end) {
            overlaps++;
        } else {
            const outerFirst = sections[0].start <= sections[1].start;
            const isContained = sections[+outerFirst].end <= sections[+!outerFirst].end;
            overlaps += +(isContained);
        }
    });
    console.log(`overlaps: ${overlaps}`);
}

function b(input) {
    const sets = input.split('\n');
    let overlaps = 0;
    sets.forEach(s => {
        const elves = s.split(',');
        let sections = {};
        elves.forEach((elf, i) => {
            const [start, end] = elf.split('-');
            sections[i] = {
                start: Number(start),
                end: Number(end)
            };
        });
        if (sections[0].start === sections[1].start || sections[0].end === sections[1].end) {
            overlaps++;
        } else {
            const lowerFirst = sections[0].start < sections[1].start;
            const isContained = sections[+lowerFirst].start <= sections[+!lowerFirst].end;
            overlaps += +(isContained);
        }
    });
    console.log(`overlaps: ${overlaps}`);
}

module.exports = {
    a,
    b
};