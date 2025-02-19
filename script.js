document.addEventListener("DOMContentLoaded", () => {
    const magicSquare = [8, 1, 6, 3, 5, 7, 4, 9, 2];
    let userGrid = new Array(9).fill(0);
    let difficulty = sessionStorage.getItem("difficulty") || "easy";

    document.getElementById("difficulty-label").innerText = `Level: ${capitalize(difficulty)}`;

    document.querySelectorAll(".tile").forEach((tile, index) => {
        tile.innerText = "?"; // Start with a question mark
        tile.dataset.value = "0"; // Start value
        userGrid[index] = 0; // Initialize user grid

        tile.addEventListener("click", () => {
            let current = parseInt(tile.dataset.value, 10);
            let next = (current % 9) + 1; // Cycle from 1 → 9 → 1
            tile.innerText = next;
            tile.dataset.value = next;
            userGrid[index] = next;
        });
    });

    document.getElementById("unlock-btn").addEventListener("click", () => {
        console.log("Unlock button clicked! Checking grid:", userGrid);

        if (isValidMagicSquare(userGrid)) {
            document.getElementById("lock").classList.add("unlocked");

            setTimeout(() => {
                if (sessionStorage.getItem("firstTime") === null) {
                    sessionStorage.setItem("firstTime", "done");
                    window.location.href = "birthday.html";
                } else {
                    alert("Unlocked! Try the harder level.");
                    nextDifficulty();
                }
            }, 1000);
        } else {
            document.getElementById("message").innerText = "Incorrect! Try again.";
            shakeLock();
        }
    });

    function isValidMagicSquare(grid) {
        if (grid.includes(0)) return false;
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

    function shakeLock() {
        console.log("Shaking the lock!");
        let lock = document.getElementById("lock");
        lock.style.transform = "translateX(5px)";
        setTimeout(() => lock.style.transform = "translateX(-5px)", 100);
        setTimeout(() => lock.style.transform = "translateX(0)", 200);
    }

    function nextDifficulty() {
        if (difficulty === "easy") sessionStorage.setItem("difficulty", "normal");
        else if (difficulty === "normal") sessionStorage.setItem("difficulty", "hard");
        else if (difficulty === "hard") sessionStorage.setItem("difficulty", "extreme");
        window.location.reload();
    }

    function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
});
