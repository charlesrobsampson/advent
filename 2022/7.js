function a(input) {
    const lines = input.split('\n');
    const t = createTree(lines, 0);
    const totalSize = sumSizes(t.tree, 100000);
    console.log(`total size: ${totalSize}`);
}

function b(input) {
    const lines = input.split('\n');
    const t = createTree(lines, 0);
    const spaceLeft = 70000000 - t.size;
    const spaceNeeded = 30000000 - spaceLeft;
    const spaceCleared = findNearest(t.tree, spaceNeeded);
    console.log(`space cleared: ${spaceCleared}`);
}

function createTree(lines, i) {
    let tree = {
        size : 0
    };
    for (let j = i; j < lines.length; j++) {
        const cmd = lines[j].split(' ');
        if (cmd[0] === '$') {
            if (cmd[1] === 'cd') {
                if (cmd[2] === '..') {
                    return {
                        tree,
                        size: tree.size,
                        j
                    };
                } else {
                    const newTree = createTree(lines, j+1);
                    tree[cmd[2]] = newTree.tree;
                    tree.size += newTree.size;
                    j = newTree.j;
                }
            }
        } else if (cmd[0] !== 'dir') {
            tree.size += +cmd[0];
            tree[cmd[1]] = +cmd[0];
        }
    }
    return {
        tree,
        size: tree.size,
        j: lines.length
    };
}

function sumSizes(tree, cap) {
    let contents = Object.keys(tree);
    let size = 0;
    if (tree.size <= cap) {
        size = tree.size;
    }
    for (let i = 0; i < contents.length; i++) {
        if (typeof tree[contents[i]] === 'object') {
            size += sumSizes(tree[contents[i]], cap);
        }
    }
    return size;
}

function findNearest(tree, target, candidate) {
    if (tree.size >= target) {
        if (!candidate) {
            candidate = tree.size
        } else if (tree.size < candidate) {
            candidate = tree.size;
        }
    } 
    let contents = Object.keys(tree);
    for (let i = 0; i < contents.length; i++) {
        if (typeof tree[contents[i]] === 'object') {
            candidate = findNearest(tree[contents[i]], target, candidate);
        }
    }
    return candidate;
}

module.exports = {
    a,
    b
};