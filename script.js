const magicSquare = [8, 1, 6, 3, 5, 7, 4, 9, 2];
let userGrid = new Array(9).fill(null);


setupGrid();

document.querySelectorAll('.tile').forEach((tile, index) => {
    tile.addEventListener('click', () => {
        let current = parseInt(tile.innerText) || 0;
        let next = (current % 9) + 1;
        tile.innerText = next;
        userGrid[index] = next;
    });
});

document.getElementById('unlock-btn').addEventListener('click', () => {
    let lockpad = document.querySelector('.lockpad');
    if (isValidMagicSquare(userGrid, magicSquare)) {
        lockpad.classList.add('flash-green');
        document.getElementById('lock').classList.add('unlocked', 'correct');
        document.getElementById('indicator').classList.add('correct');
        window.location.href = 'birthday.html';
    } else {
        lockpad.classList.add('flash-red');
        document.getElementById('message').innerText = "Incorrect! Try again.";
        shakeLock();
        document.getElementById('lock').classList.add('incorrect');
        document.getElementById('indicator').classList.add('incorrect');
        setTimeout(() => {
            document.getElementById('message').innerText = "";
        }, 2000);
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

function setupGrid() {
    let tiles = document.querySelectorAll('.tile');
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
}
