const gameArea = document.getElementById('game-area');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');
const levelDisplay = document.getElementById('level');
const gameOverDiv = document.getElementById('game-over');

let score = 0;
let highScore = 0;
let level = 1;
let speed = 3;
let colors = ['red', 'green', 'blue'];
let backgrounds = ['#1e1e2f', '#2f1e1e', '#1e2f1e'];
let gameRunning = true;

function createBall() {
  const ball = document.createElement('div');
  ball.classList.add('ball');
  ball.style.background = colors[(level - 1) % colors.length];
  ball.style.left = Math.random() * (gameArea.clientWidth - 30) + 'px';
  ball.style.top = '0px';
  gameArea.appendChild(ball);

  let ballInterval = setInterval(() => {
    if (!gameRunning) return clearInterval(ballInterval);

    let top = parseInt(ball.style.top);
    top += speed;
    ball.style.top = top + 'px';

    const ballRect = ball.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (
      ballRect.bottom >= playerRect.top &&
      ballRect.right >= playerRect.left &&
      ballRect.left <= playerRect.right
    ) {
      score++;
      scoreDisplay.innerText = score;
      gameArea.removeChild(ball);
      clearInterval(ballInterval);

      if (score % 10 === 0) nextLevel();
    } else if (top > gameArea.clientHeight) {
      gameOver();
      clearInterval(ballInterval);
    }
  }, 20);
}

function movePlayer(e) {
  const rect = gameArea.getBoundingClientRect();
  let x = e.clientX - rect.left;
  player.style.left = Math.min(Math.max(x - 30, 0), rect.width - 60) + 'px';
}

function startGame() {
  score = 0;
  level = 1;
  speed = 3;
  gameRunning = true;
  scoreDisplay.innerText = score;
  levelDisplay.innerText = level;
  gameOverDiv.style.display = 'none';
  gameArea.style.background = backgrounds[level - 1];
  gameLoop();
}

function gameLoop() {
  if (!gameRunning) return;
  createBall();
  setTimeout(gameLoop, 1000);
}

function nextLevel() {
  level++;
  levelDisplay.innerText = level;
  speed += 1;
  gameArea.style.background = backgrounds[(level - 1) % backgrounds.length];
}

function gameOver() {
  gameRunning = false;
  if (score > highScore) {
    highScore = score;
    highScoreDisplay.innerText = highScore;
  }
  gameOverDiv.style.display = 'block';
}

function restartGame() {
  document.querySelectorAll('.ball').forEach(b => b.remove());
  startGame();
}

window.addEventListener('mousemove', movePlayer);
startGame();
