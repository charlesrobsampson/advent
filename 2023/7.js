function a(input) {
    const hands = input.split('\n');
    const allHands = [];
    hands.forEach(handBid => {
        const [hand, bid] = handBid.split(' ');
        const {ranked, typed} = rankHand(hand);
        allHands.push({
            hand,
            ranked,
            type: typed,
            bid: Number(bid)
        });
    });
    allHands.sort((a, b) => {
        if (a.type < b.type) {
            return 1;
        } else if (a.type > b.type) {
            return -1;
        } else {
            if (a.ranked < b.ranked) {
                return 1;
            } else if (a.ranked > b.ranked) {
                return -1
            }
        }
        return 0;
    });

    let total = 0;
    for (let i = 0; i < allHands.length; i++) {
        total += (i+1) * allHands[i].bid;
    }

    console.log(total);
}

function b(input) {
    const hands = input.split('\n');
    const allHands = [];
    hands.forEach(handBid => {
        const [hand, bid] = handBid.split(' ');
        const {ranked, typed} = rankHandj(hand);
        allHands.push({
            hand,
            ranked,
            type: typed,
            bid: Number(bid)
        });
    });
    allHands.sort((a, b) => {
        if (a.type < b.type) {
            return 1;
        } else if (a.type > b.type) {
            return -1;
        } else {
            if (a.ranked < b.ranked) {
                return 1;
            } else if (a.ranked > b.ranked) {
                return -1
            }
        }
        return 0;
    });

    let total = 0;
    for (let i = 0; i < allHands.length; i++) {
        total += (i+1) * allHands[i].bid;
    }

    // console.log(allHands);
    console.log(total);
}

const ranks = {
    A: 'A',
    K: 'B',
    Q: 'C',
    J: 'D',
    T: 'E',
    '9': 'F',
    '8': 'G',
    '7': 'H',
    '6': 'I',
    '5': 'J',
    '4': 'K',
    '3': 'L',
    '2': 'M'
};

const ranksj = {
    A: 'A',
    K: 'B',
    Q: 'C',
    T: 'E',
    '9': 'F',
    '8': 'G',
    '7': 'H',
    '6': 'I',
    '5': 'J',
    '4': 'K',
    '3': 'L',
    '2': 'M',
    J: 'Z'
};

const types = {
    'Five of a kind': 'A',
    'Four of a kind': 'B',
    'Full house': 'C',
    'Three of a kind': 'D',
    'Two pair': 'E',
    'One pair': 'F',
    'High card': 'G'
}

function rankHand(hand) {
    let ranked = '';
    const counts = {};
    for (let i = 0; i < hand.length; i++) {
        const card = hand[i];
        ranked += ranks[card];
        if (counts[card]) {
            counts[card]++;
        } else {
            counts[card] = 1;
        }
    }
    const labels = Object.keys(counts);
    let max = 0;
    for (let i = 0; i < labels.length; i++) {
        const count = counts[labels[i]];
        if (count > max) {
            max = count;
        }
    }
    if (labels.length === 1) {
        return {
            ranked,
            typed: types['Five of a kind']
        };
    }
    if (labels.length === 2) {
        if (max === 4) {
            return {
                ranked,
                typed: types['Four of a kind']
            };
        }
        return {
            ranked,
            typed: types['Full house']
        };
    }
    if (labels.length === 3) {
        if (max === 3) {
            return {
                ranked,
                typed: types['Three of a kind']
            };
        }
        return {
            ranked,
            typed: types['Two pair']
        };
    }
    if (labels.length === 4) {
        return {
            ranked,
            typed: types['One pair']
        };
    }
    if (labels.length === 5) {
        return {
            ranked,
            typed: types['High card']
        };
    }
}

function rankHandj(hand) {
    let ranked = '';
    const counts = {};
    let jokers = 0;
    for (let i = 0; i < hand.length; i++) {
        const card = hand[i];
        if (card === 'J') {
            jokers++;
        }
        ranked += ranksj[card];
        if (counts[card]) {
            counts[card]++;
        } else {
            counts[card] = 1;
        }
    }
    const labels = Object.keys(counts);
    let max = 0;
    for (let i = 0; i < labels.length; i++) {
        const count = counts[labels[i]];
        if (count > max) {
            max = count;
        }
    }
    if (labels.length === 1 || (labels.length === 2 && jokers > 0)) {
        return {
            ranked,
            typed: types['Five of a kind']
        };
    }
    if (labels.length === 2 || (labels.length === 3 && jokers > 0)) {
        if (max === 4 || jokers === 2 || (max === 3 && jokers > 0)) {
            return {
                ranked,
                typed: types['Four of a kind']
            };
        }
        return {
            ranked,
            typed: types['Full house']
        };
    }
    if (labels.length === 3 || (labels.length === 4 && jokers > 0)) {
        if (max === 3 || jokers === 2 || (max === 2 && jokers > 0)) {
            return {
                ranked,
                typed: types['Three of a kind']
            };
        }
        return {
            ranked,
            typed: types['Two pair']
        };
    }
    if (labels.length === 4 || (labels.length === 5 && jokers > 0)) {
        return {
            ranked,
            typed: types['One pair']
        };
    }
    if (labels.length === 5) {
        return {
            ranked,
            typed: types['High card']
        };
    }
}

module.exports = {
    a,
    b
};