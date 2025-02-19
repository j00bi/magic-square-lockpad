const magicSquareEasy = [8, 1, 6, 3, 5, 7, 4, 9, 2];
const magicSquareMedium = [5, 3, 4, 6, 2, 7, 9, 1, 8];
const magicSquareHard = [2, 7, 6, 9, 5, 1, 4, 3, 8];
let userGrid = new Array(9).fill(null);
let difficulty = localStorage.getItem('difficulty') || 'easy';

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
    let difficulty = localStorage.getItem('difficulty') || 'easy';
    let solution;
    if (difficulty === 'easy') solution = magicSquareEasy;
    else if (difficulty === 'medium') solution = magicSquareMedium;
    else if (difficulty === 'hard') solution = magicSquareHard;
    else solution = magicSquareEasy;
    
    if (isValidMagicSquare(userGrid, solution)) {
        document.getElementById('lock').classList.add('unlocked');
        setTimeout(() => {
            if (localStorage.getItem('firstTime') === null) {
                localStorage.setItem('firstTime', 'done');
                localStorage.setItem('difficulty', 'easy'); // Reset difficulty
                window.location.href = 'birthday.html';
            } else {
                alert('Unlocked! Try the harder level.');
                nextDifficulty();
            }
        }, 1000);
    } else {
        document.getElementById('message').innerText = "Incorrect! Try again.";
        shakeLock();
        document.getElementById('lock').classList.add('incorrect');
        setTimeout(() => document.getElementById('lock').classList.remove('incorrect'), 300);
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
    let currentDifficulty = localStorage.getItem('difficulty') || 'easy';
    let nextDifficulty;
    if (currentDifficulty === 'easy') nextDifficulty = 'medium';
    else if (currentDifficulty === 'medium') nextDifficulty = 'hard';
    else nextDifficulty = 'easy'; // Loop back to easy after hard
    localStorage.setItem('difficulty', nextDifficulty);
    window.location.reload();
}

function setupGrid(level) {
    let tiles = document.querySelectorAll('.tile');
    let solution;
    if (level === 'easy') {
        solution = magicSquareEasy;
        tiles[0].innerText = '8';
        tiles[4].innerText = '5';
        tiles[8].innerText = '2';
        userGrid[0] = 8;
        userGrid[4] = 5;
        userGrid[8] = 2;
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].innerText === '') {
                tiles[i].innerText = '?';
            }
        }
    } else if (level === 'medium') {
        solution = magicSquareMedium;
        tiles.forEach(tile => tile.innerText = '?');
    } else if (level === 'hard') {
        solution = magicSquareHard;
        tiles.forEach(tile => tile.innerText = '?');
    } else {
        solution = magicSquareEasy;
        tiles.forEach(tile => tile.innerText = '?');
    }
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
