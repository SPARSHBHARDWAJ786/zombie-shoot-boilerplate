// Iteration 1: Declare variables required for this game

// Iteration 1.2: Add shotgun sound

// Iteration 1.3: Add background sound

// Iteration 1.4: Add lives

// Iteration 2: Write a function to make a zombie

// Iteration 3: Write a function to check if the player missed a zombie

// Iteration 4: Write a function to destroy a zombie when it is shot or missed

// Iteration 5: Creating timer

// Iteration 6: Write a code to start the game by calling the first zombie

// Iteration 7: Write the helper function to get random integer
// Iteration 1: Declare variables required for this game
let lives = 3;
let timer = 60;
let zombies = [];
let zombieInterval;
const gameBody = document.getElementById("game-body");
const timerElement = document.getElementById("timer");
const livesElement = document.getElementById("lives");
const shotgunSound = new Audio('./assets/shotgun.mp3');
const backgroundSound = new Audio('./assets/background.mp3');
backgroundSound.loop = true;

// Iteration 1.2: Add shotgun sound
document.addEventListener("click", () => {
    shotgunSound.play();
});

// Iteration 1.3: Add background sound
backgroundSound.play();

// Iteration 1.4: Add lives
function updateLives() {
    livesElement.style.width = `${(lives / 3) * 100}%`;
}
updateLives();

// Iteration 2: Write a function to make a zombie
function createZombie() {
    const zombie = document.createElement("img");
    zombie.src = './assets/zombie.png';
    zombie.classList.add("zombie-image");
    zombie.style.left = `${Math.random() * 80 + 10}vw`;
    zombie.onclick = () => destroyZombie(zombie, true);
    gameBody.appendChild(zombie);
    zombies.push(zombie);

    // Remove zombie after animation ends
    zombie.addEventListener('animationend', () => {
        if (zombie.parentElement) {
            destroyZombie(zombie, false);
        }
    });
}

// Iteration 3: Write a function to check if the player missed a zombie
function checkMissedZombies() {
    zombies.forEach(zombie => {
        if (parseInt(zombie.style.bottom) > window.innerHeight && zombie.parentElement) {
            destroyZombie(zombie, false);
        }
    });
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function destroyZombie(zombie, isShot) {
    if (isShot) {
        zombie.remove();
        zombies = zombies.filter(z => z !== zombie);
    } else {
        lives--;
        updateLives();
        if (lives <= 0) {
            endGame(false);
        }
    }
}

// Iteration 5: Creating timer
function startTimer() {
    const timerInterval = setInterval(() => {
        timer--;
        timerElement.textContent = timer;
        if (timer <= 0) {
            clearInterval(timerInterval);
            endGame(true);
        }
    }, 1000);
}

// Iteration 6: Write a code to start the game by calling the first zombie
function startGame() {
    createZombie();
    zombieInterval = setInterval(createZombie, 2000);
    startTimer();
    setInterval(checkMissedZombies, 100);
}
startGame();

// Iteration 7: Write the helper function to get random integer
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Ending the Game
function endGame(isWin) {
    clearInterval(zombieInterval);
    zombies.forEach(zombie => zombie.remove());
    backgroundSound.pause();

    if (isWin) {
        location.href = "./win.html";
    } else {
        location.href = "./gameover.html";
    }
}
