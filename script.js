const magicSquareEasy = [8, 1, 6, 3, 5, 7, 4, 9, 2];
const magicSquareHard = [2, 7, 6, 9, 5, 1, 4, 3, 8];
let userGrid = new Array(9).fill(null);
let difficulty = sessionStorage.getItem('difficulty') || 'easy';

document.getElementById('difficulty-label').innerText = `Level: ${capitalize(difficulty)}`;

// Set up initial grid based on difficulty
setupGrid(difficulty);

document.querySelectorAll('.tile').forEach((tile, index) => {
    tile.addEventListener('click', () => {
        let current = parseInt(tile.innerText) || 0;
        let next = (current % 9) + 1;
        tile.innerText = next;
        userGrid[index] = next;
    });
});

document.getElementById('unlock-btn').addEventListener('click', () => {
    let solution = difficulty === 'hard' ? magicSquareHard : magicSquareEasy;
    if (isValidMagicSquare(userGrid, solution)) {
        document.getElementById('lock').classList.add('unlocked');
        setTimeout(() => {
            if (sessionStorage.getItem('firstTime') === null) {
                sessionStorage.setItem('firstTime', 'done');
                window.location.href = 'birthday.html';
            } else {
                alert('Unlocked! Try the harder level.');
                nextDifficulty();
            }
        }, 1000);
    } else {
        document.getElementById('message').innerText = "Incorrect! Try again.";
        shakeLock();
    }
});

function isValidMagicSquare(grid, solution) {
    if (grid.includes(null)) return false;
    return grid.every((num, i) => num === solution[i]);
}

function shakeLock() {
    let lock = document.getElementById('lock');
    lock.classList.add('shake');
    setTimeout(() => lock.classList.remove('shake'), 300);
}

function nextDifficulty() {
    if (difficulty === 'easy') sessionStorage.setItem('difficulty', 'medium');
    else if (difficulty === 'medium') sessionStorage.setItem('difficulty', 'hard');
    else if (difficulty === 'hard') sessionStorage.setItem('difficulty', 'extreme');
    window.location.reload();
}

function setupGrid(level) {
    const tiles = document.querySelectorAll('.tile');
    if (level === 'easy') {
        tiles[0].innerText = '8';
        tiles[4].innerText = '5';
        tiles[8].innerText = '2';
        userGrid[0] = 8;
        userGrid[4] = 5;
        userGrid[8] = 2;
    } else {
        tiles.forEach(tile => tile.innerText = '?');
    }
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
