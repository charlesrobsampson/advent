function a(input) {
    const hor = input.split('\n');
    let grid = [];
    let visible = 0;
    let total = 0;
    hor.forEach(line => {
        const vert = line.split('');
        grid.push(vert);
    });
    grid = add1(grid);
    ({ grid, visible } = checkFromLeft(grid));
    total += visible;
    ({ grid, visible } = checkFromRight(grid));
    total += visible;
    ({ grid, visible } = checkFromTop(grid));
    total += visible;
    ({ grid, visible } = checkFromBottom(grid));
    total += visible;
    console.log('total: ', total);
}

function b(input) {
    const hor = input.split('\n');
    let grid = [];
    let max = 0;
    hor.forEach(line => {
        const vert = line.split('');
        grid.push(vert);
    });
    grid = add1(grid);
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let score = 1;
            score *= getLeftScore(grid, grid[i][j], i, j);
            score *= getRightScore(grid, grid[i][j], i, j);
            score *= getTopScore(grid, grid[i][j], i, j);
            score *= getBottomScore(grid, grid[i][j], i, j);
            if (score > max) {
                max = score;
            }
        }
    }
    console.log('max view: ', max);
}

function checkFromLeft(grid) {
    let visible = 0;
    for (let i = 0; i < grid.length; i++) {
        let max = -1;
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = +grid[i][j];
            if (j === 0) {
                if (grid[i][j] > 0) {
                    visible++;
                    max = grid[i][j];
                    grid[i][j] = - grid[i][j];
                } else {
                    if (- grid[i][j] > max) {
                        max = - grid[i][j];
                    }
                }
            } else {
                if (grid[i][j] > 0) {
                    if (grid[i][j] > max) {
                        visible++;
                        max = grid[i][j];
                        grid[i][j] = - grid[i][j];
                    }
                } else {
                    if (- grid[i][j] > max) {
                        max = - grid[i][j];
                    }
                }
            }
        }
    }
    return { grid, visible };
}

function checkFromRight(grid) {
    let visible = 0;
    for (let i = 0; i < grid.length; i++) {
        let max = -1;
        for (let j = grid[i].length - 1; j >= 0; j--) {
            grid[i][j] = +grid[i][j];
            if (j === grid[i].length - 1) {
                if (grid[i][j] > 0) {
                    visible++;
                    max = grid[i][j];
                    grid[i][j] = - grid[i][j];
                } else {
                    if (- grid[i][j] > max) {
                        max = - grid[i][j];
                    }
                }
            } else {
                if (grid[i][j] > 0) {
                    if (grid[i][j] > max) {
                        visible++;
                        max = grid[i][j];
                        grid[i][j] = - grid[i][j];
                    }
                } else {
                    if (- grid[i][j] > max) {
                        max = - grid[i][j];
                    }
                }
            }
        }
    }
    return { grid, visible };
}

function checkFromTop(grid) {
    let visible = 0;
    for (let j = 0; j < grid[0].length; j++) {
        let max = -1;
        for (let i = 0; i < grid.length; i++) {
            grid[i][j] = +grid[i][j];
            if (i === 0) {
                if (grid[i][j] > 0) {
                    visible++;
                    max = grid[i][j];
                    grid[i][j] = - grid[i][j];
                } else {
                    if (- grid[i][j] > max) {
                        max = - grid[i][j];
                    }
                }
            } else {
                if (grid[i][j] > 0) {
                    if (grid[i][j] > max) {
                        visible++;
                        max = grid[i][j];
                        grid[i][j] = - grid[i][j];
                    }
                } else {
                    if (- grid[i][j] > max) {
                        max = - grid[i][j];
                    }
                }
            }
        }
    }
    return { grid, visible };
}

function checkFromBottom(grid) {
    let visible = 0;
    for (let j =0; j < grid[0].length; j++) {
        let max = -1;
        for (let i = grid.length - 1; i >= 0; i--) {
            grid[i][j] = +grid[i][j];
            if (i === grid.length - 1) {
                if (grid[i][j] > 0) {
                    visible++;
                    max = grid[i][j];
                    grid[i][j] = - grid[i][j];
                } else {
                    if (- grid[i][j] > max) {
                        max = - grid[i][j];
                    }
                }
            } else {
                if (grid[i][j] > 0) {
                    if (grid[i][j] > max) {
                        visible++;
                        max = grid[i][j];
                        grid[i][j] = - grid[i][j];
                    }
                } else {
                    if (- grid[i][j] > max) {
                        max = - grid[i][j];
                    }
                }
            }
        }
    }
    return { grid, visible };
}

function add1(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = +grid[i][j] + 1;
        }
    }
    return grid;
}

function getLeftScore(grid, h, i, j) {
    let score = 0;
    j--;
    if (j >= 0) {
        score++;
        if (grid[i][j] < h) {
            score += getLeftScore(grid, h, i,j);
        }
    }
    return score;
}

function getRightScore(grid, h, i, j) {
    let score = 0;
    j++;
    if (j <= grid[i].length - 1) {
        score++;
        if (grid[i][j] < h) {
            score += getRightScore(grid, h, i,j);
        }
    }
    return score;
}

function getTopScore(grid, h, i, j) {
    let score = 0;
    i--;
    if (i >= 0) {
        score++;
        if (grid[i][j] < h) {
            score += getTopScore(grid, h, i,j);
        }
    }
    return score;
}

function getBottomScore(grid, h, i, j) {
    let score = 0;
    i++;
    if (i <= grid.length - 1) {
        score++;
        if (grid[i][j] < h) {
            score += getBottomScore(grid, h, i,j);
        }
    }
    return score;
}

module.exports = {
    a,
    b
};