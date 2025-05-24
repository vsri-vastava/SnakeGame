const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = 1;
let dy = 0;
let score = 0;
let gameInterval;

// Create grid
function drawGrid() {
  gameArea.innerHTML = '';
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      if (snake.some(part => part.x === x && part.y === y)) {
        cell.classList.add('snake');
      }

      if (x === food.x && y === food.y) {
        cell.classList.add('food');
      }

      gameArea.appendChild(cell);
    }
  }
}

// Move the snake
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Game over conditions
  if (
    head.x < 0 || head.y < 0 ||
    head.x >= gridSize || head.y >= gridSize ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(gameInterval);
    alert('Game Over! Final Score: ' + score);
    location.reload();
    return;
  }

  snake.unshift(head);

  // Eat food
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.textContent = score;
    placeFood();
  } else {
    snake.pop(); // Remove tail if no food eaten
  }

  drawGrid();
}

// Randomly place food
function placeFood() {
  food = {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize)
  };
  // Ensure food doesn't spawn on the snake
  if (snake.some(part => part.x === food.x && part.y === food.y)) {
    placeFood();
  }
}

// Handle key presses
document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      if (dy !== 1) { dx = 0; dy = -1; }
      break;
    case 'ArrowDown':
      if (dy !== -1) { dx = 0; dy = 1; }
      break;
    case 'ArrowLeft':
      if (dx !== 1) { dx = -1; dy = 0; }
      break;
    case 'ArrowRight':
      if (dx !== -1) { dx = 1; dy = 0; }
      break;
  }
});

// Start game
drawGrid();
gameInterval = setInterval(moveSnake, 150);
