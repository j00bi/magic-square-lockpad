const magicSquare = [8, 1, 6, 3, 5, 7, 4, 9, 2];
let userGrid = new Array(9).fill(null);
let difficulty = sessionStorage.getItem('difficulty') || 'easy';

// Display difficulty level
document.getElementById('difficulty-label').innerText = `Level: ${capitalize(difficulty)}`;

// Tile click event to cycle numbers from 1 to 9
document.querySelectorAll('.tile').forEach((tile, index) => {
    tile.innerText = "1";  // Default value
    tile.dataset.value = 1; // Store value internally
    userGrid[index] = 1; // Initialize user grid

    tile.addEventListener('click', () => {
        let current = parseInt(tile.dataset.value, 10);
        let next = (current % 9) + 1;  // Cycle from 1 to 9
        tile.innerText = next;
        tile.dataset.value = next;  // Update dataset
        userGrid[index] = next;  // Update user grid
    });
});

// Unlock button logic
document.getElementById('unlock-btn').addEventListener('click', () => {
    if (isValidMagicSquare(userGrid)) {
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

// Function to check if the user input forms a magic square
function isValidMagicSquare(grid) {
    if (grid.includes(null)) return false;
    let sum = 15;
    return (
        grid[0] + grid[1] + grid[2] === sum &&
        grid[3] + grid[4] + grid[5] === sum &&
        grid[6] + grid[7] + grid[8] === sum &&
        grid[0] + grid[3] + grid[6] === sum &&
        grid[1] + grid[4] + grid[7] === sum &&
        grid[2] + grid[5] + grid[8] === sum &&
        grid[0] + grid[4] + grid[8] === sum &&
        grid[2] + grid[4] + grid[6] === sum
    );
}

// Shake animation for incorrect attempts
function shakeLock() {
    let lock = document.getElementById('lock');
    lock.style.transform = "translateX(5px)";
    setTimeout(() => lock.style.transform = "translateX(-5px)", 100);
    setTimeout(() => lock.style.transform = "translateX(0)", 200);
}

// Increase difficulty on retry
function nextDifficulty() {
    if (difficulty === 'easy') sessionStorage.setItem('difficulty', 'normal');
    else if (difficulty === 'normal') sessionStorage.setItem('difficulty', 'hard');
    else if (difficulty === 'hard') sessionStorage.setItem('difficulty', 'extreme');
    window.location.reload();
}

// Capitalize function for text formatting
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
