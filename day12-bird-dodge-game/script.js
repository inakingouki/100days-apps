const game = document.getElementById("game");
const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");

const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("high-score");
const finalScoreElement = document.getElementById("final-score");

const startScreen = document.getElementById("start-screen");
const gameOverScreen = document.getElementById("game-over-screen");

const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const jumpButton = document.getElementById("jump-button");
const duckButton = document.getElementById("duck-button");

const GROUND_BOTTOM = 83;
const PLAYER_START_LEFT = 75;

let gameRunning = false;
let animationId = null;

let obstacleType = "cactus";
let obstacleX = 0;
let obstacleSpeed = 6;

let score = 0;
let highScore = Number(localStorage.getItem("birdDodgeHighScore")) || 0;

let isJumping = false;
let isDucking = false;

let jumpHeight = 0;
let jumpVelocity = 0;

let lastTime = 0;
let obstacleWaiting = false;

highScoreElement.textContent = highScore;

function startGame() {
    cancelAnimationFrame(animationId);

    gameRunning = true;
    score = 0;
    obstacleSpeed = 6;

    isJumping = false;
    isDucking = false;

    jumpHeight = 0;
    jumpVelocity = 0;

    obstacleWaiting = false;

    scoreElement.textContent = "0";
    finalScoreElement.textContent = "0";

    player.classList.remove("ducking");
    player.style.bottom = `${GROUND_BOTTOM}px`;
    player.style.left = `${PLAYER_START_LEFT}px`;

    startScreen.classList.add("hidden");
    gameOverScreen.classList.add("hidden");

    createObstacle();

    lastTime = performance.now();
    animationId = requestAnimationFrame(gameLoop);
}

function createObstacle() {
    obstacleType = Math.random() < 0.55 ? "cactus" : "bird";

    obstacle.className = `obstacle ${obstacleType}`;
    obstacle.setAttribute("aria-hidden", "false");

    if (obstacleType === "cactus") {
        obstacle.textContent = "🌵";
    } else {
        obstacle.textContent = "🐦";
    }

    obstacleX = game.clientWidth + 40;
    obstacle.style.left = `${obstacleX}px`;
}

function scheduleNextObstacle() {
    if (obstacleWaiting || !gameRunning) {
        return;
    }

    obstacleWaiting = true;
    obstacle.classList.add("hidden");

    const delay = 700 + Math.random() * 900;

    window.setTimeout(() => {
        if (!gameRunning) {
            return;
        }

        obstacleWaiting = false;
        obstacle.classList.remove("hidden");
        createObstacle();
    }, delay);
}

function jump() {
    if (!gameRunning || isJumping) {
        return;
    }

    stopDucking();

    isJumping = true;
    jumpVelocity = 15;
}

function startDucking() {
    if (!gameRunning || isJumping) {
        return;
    }

    isDucking = true;
    player.classList.add("ducking");
}

function stopDucking() {
    isDucking = false;
    player.classList.remove("ducking");
}

function updatePlayer(deltaRatio) {
    if (!isJumping) {
        return;
    }

    jumpHeight += jumpVelocity * deltaRatio;
    jumpVelocity -= 0.78 * deltaRatio;

    if (jumpHeight <= 0) {
        jumpHeight = 0;
        jumpVelocity = 0;
        isJumping = false;
    }

    player.style.bottom = `${GROUND_BOTTOM + jumpHeight}px`;
}

function updateObstacle(deltaRatio) {
    if (obstacleWaiting) {
        return;
    }

    obstacleX -= obstacleSpeed * deltaRatio;
    obstacle.style.left = `${obstacleX}px`;

    if (obstacleX < -80) {
        score += 1;
        scoreElement.textContent = score;

        obstacleSpeed = Math.min(13, 6 + score * 0.25);

        scheduleNextObstacle();
    }
}

function getCollisionBox(element, padding = 0) {
    const rect = element.getBoundingClientRect();

    return {
        left: rect.left + padding,
        right: rect.right - padding,
        top: rect.top + padding,
        bottom: rect.bottom - padding
    };
}

function isColliding() {
    if (obstacleWaiting || obstacle.classList.contains("hidden")) {
        return false;
    }

    /*
     * 絵文字や人型の透明な余白を除くため、
     * 判定を少し内側に縮めています。
     */
    const playerPadding = isDucking ? 7 : 6;
    const obstaclePadding = obstacleType === "bird" ? 10 : 8;

    const playerBox = getCollisionBox(player, playerPadding);
    const obstacleBox = getCollisionBox(obstacle, obstaclePadding);

    return (
        playerBox.left < obstacleBox.right &&
        playerBox.right > obstacleBox.left &&
        playerBox.top < obstacleBox.bottom &&
        playerBox.bottom > obstacleBox.top
    );
}

function gameOver() {
    gameRunning = false;
    cancelAnimationFrame(animationId);

    stopDucking();

    finalScoreElement.textContent = score;

    if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = highScore;
        localStorage.setItem("birdDodgeHighScore", String(highScore));
    }

    gameOverScreen.classList.remove("hidden");
}

function gameLoop(currentTime) {
    if (!gameRunning) {
        return;
    }

    const delta = Math.min(currentTime - lastTime, 32);
    const deltaRatio = delta / 16.67;

    lastTime = currentTime;

    updatePlayer(deltaRatio);
    updateObstacle(deltaRatio);

    if (isColliding()) {
        gameOver();
        return;
    }

    animationId = requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (event) => {
    if (
        event.code === "Space" ||
        event.code === "ArrowDown"
    ) {
        event.preventDefault();
    }

    if (event.code === "Space") {
        jump();
    }

    if (event.code === "ArrowDown") {
        startDucking();
    }
});

document.addEventListener("keyup", (event) => {
    if (event.code === "ArrowDown") {
        stopDucking();
    }
});

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
jumpButton.addEventListener("click", jump);

duckButton.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    startDucking();
});

duckButton.addEventListener("pointerup", stopDucking);
duckButton.addEventListener("pointercancel", stopDucking);
duckButton.addEventListener("pointerleave", stopDucking);