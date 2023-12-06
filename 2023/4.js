function a(input) {
    let cards = input.replace(/\s{2,}/g, ' ').split('\n');
    let total = 0;
    cards.forEach(c => {
        const card = formatCard(c);
        let score = 0;
        card.owned.forEach(owned => {
            if (card.winning[owned]) {
                if (score === 0) {
                    score++;
                } else {
                    score *= 2;
                }
            }
        });
        total += score;
    });
    console.log(total);
}

function b(input) {
    let cards = input.replace(/\s{2,}/g, ' ').split('\n');
    let totalCards = {};
    cards.forEach(c => {
        const card = formatCard(c);
        if (!totalCards[card.id]) {
            totalCards[card.id] = 1;
        } else {
            totalCards[card.id]++;
        }
        let matches = 0;
        card.owned.forEach(owned => {
            if (card.winning[owned]) {
                matches++;
            }
        });
        for (let i = 1; i <= matches; i ++) {
            let mult = totalCards[card.id];
            if (totalCards[card.id + i]) {
                totalCards[card.id + i] += mult;
            } else {
                totalCards[card.id + i] = mult;
            }
        }
    });
    let total = 0;
    Object.keys(totalCards).forEach(id => {
        total += totalCards[id];
    });
    console.log(total);
}

function formatCard(c) {
    const [cardId, numbers] = c.split(': ');
    const [ , id] = cardId.split(' ');
    const [winning, owned] = numbers.split(' | ');
    const winningMap = {};
    winning.split(' ').forEach(winner => {
        winningMap[winner] = true;
    });
    return {
        id: Number(id),
        winning: winningMap,
        owned: owned.split(' ').map(n => {
            return Number(n);
        })
    };

}

module.exports = {
    a,
    b
};