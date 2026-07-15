const game = document.getElementById("game");
const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const scoreText = document.getElementById("score");
const gameOverScreen = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");

const PLAYER_X = 100;
const PLAYER_WIDTH = 45;
const OBSTACLE_WIDTH = 45;

let playerY = 0;
let obstacleX = 600;
let score = 0;

let isJumping = false;
let isGameOver = false;

document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        event.preventDefault();
        jump();
    }
});

game.addEventListener("click", jump);

function jump() {
    if (isJumping || isGameOver) {
        return;
    }

    isJumping = true;

    const jumpUp = setInterval(function () {
        playerY += 6;
        player.style.bottom = playerY + "px";

        if (playerY >= 120) {
            clearInterval(jumpUp);

            const fallDown = setInterval(function () {
                playerY -= 6;

                if (playerY <= 0) {
                    playerY = 0;
                    player.style.bottom = "0px";
                    isJumping = false;
                    clearInterval(fallDown);
                    return;
                }

                player.style.bottom = playerY + "px";
            }, 20);
        }
    }, 20);
}

const gameTimer = setInterval(function () {
    if (isGameOver) {
        return;
    }

    obstacleX -= 4;
    obstacle.style.left = obstacleX + "px";

    // 横方向で実際に重なっているか
    const playerLeft = PLAYER_X + 10;
    const playerRight = PLAYER_X + PLAYER_WIDTH - 10;

    const obstacleLeft = obstacleX + 10;
    const obstacleRight = obstacleX + OBSTACLE_WIDTH - 10;

    const overlapsHorizontally =
        playerRight > obstacleLeft &&
        playerLeft < obstacleRight;

    // プレイヤーが低い位置にいるか
    const playerIsLow = playerY < 45;

    if (overlapsHorizontally && playerIsLow) {
        isGameOver = true;
        clearInterval(gameTimer);

        finalScore.textContent = "スコア：" + score;
        gameOverScreen.style.display = "flex";

        return;
    }

    if (obstacleX < -50) {
        obstacleX = 600;
        score++;

        scoreText.textContent = "スコア：" + score;
    }
}, 20);

function restartGame() {
    location.reload();
}