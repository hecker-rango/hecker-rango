// Set up canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set up images
const background = new Image();
background.src = "https://i.imgur.com/VJyI5or.png";
const character = new Image();
character.src = "https://i.imgur.com/5QF6rHq.png";
const enemy = new Image();
enemy.src = "https://i.imgur.com/YZbrn30.png";
const supply = new Image();
supply.src = "https://i.imgur.com/6F2uh4u.png";

// Game variables
let gameState = "start";
let health = 100;
let ammo = 6;
let supplies = 0;
let enemies = [
  { x: 700, y: 300 },
  { x: 500, y: 100 },
  { x: 300, y: 400 },
  { x: 100, y: 200 }
];

// Helper functions
function drawBackground() {
  ctx.drawImage(background, 0, 0);
}

function drawCharacter() {
  ctx.drawImage(character, 50, 250);
}

function drawEnemies() {
  enemies.forEach(enemy => {
    ctx.drawImage(enemy, enemy.x, enemy.y);
  });
}

function drawSupplies() {
  ctx.drawImage(supply, 700, 50);
}

function drawStats() {
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.fillText(`Health: ${health}`, 10, 30);
  ctx.fillText(`Ammo: ${ammo}`, 10, 60);
  ctx.fillText(`Supplies: ${supplies}`, 10, 90);
}

function checkCollisions() {
  // Check for collision between character and enemies
  enemies.forEach((enemy, index) => {
    if (enemy.x <= 80 && enemy.x >= 50 && enemy.y >= 250 && enemy.y <= 280) {
      health -= 10;
      enemies.splice(index, 1);
    }
  });

  // Check for collision between character and supplies
  if (700 <= 80 && 700 >= 50 && 50 >= 250 && 50 <= 280) {
    supplies += 1;
  }
}

function updateGameState() {
  if (health <= 0) {
    gameState = "lose";
  } else if (supplies >= 3) {
    gameState = "win";
  }
}

function resetGame() {
  health = 100;
  ammo = 6;
  supplies = 0;
  enemies = [
    { x: 700, y: 300 },
    { x: 500, y: 100 },
    { x: 300, y: 400 },
    { x: 100, y: 200 }
  ];
}

// Game loop
function gameLoop() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw game objects
  drawBackground();
  drawCharacter();
  drawEnemies();
  drawSupplies();
  drawStats();

  // Move enemies
  enemies.forEach(enemy => {
    if (enemy.x <= 0) {
      enemy.x = 700;
      enemy.y = Math.floor(Math.random() * 500) + 50;
    } else {
      enemy.x -= 5;
    }
  });

  // Check for collisions
  checkCollisions();

  // Update game state
  updateGameState();

  // If game is still in progress, continue loop
  if (gameState === "inProgress") {
    requestAnimationFrame(gameLoop);
  } else {
    // Game over
    if (gameState === "win") {
      alert("Congratulations! You have won the game.");
    } else {
      alert("Game over. You have lost.");
    }

    // Reset game
    resetGame();
    gameState = "inProgress";
    requestAnimationFrame(gameLoop);
  }
}

// Start game loop
resetGame();
gameLoop();

// Event listeners for buttons
document.getElementById("attack").addEventListener("click", () => {
  if (gameState === "inProgress") {
    attack();
  }
});

document.getElementById("gather").addEventListener("click", () => {
  if (gameState === "inProgress") {
    gatherSupplies();
  }
});

// Event listener for keyboard input
document.addEventListener("keydown", event => {
  if (gameState === "inProgress") {
    switch (event.key) {
      case "ArrowUp":
        character.moveUp();
        break;
      case "ArrowDown":
        character.moveDown();
        break;
      case "ArrowLeft":
        character.moveLeft();
        break;
      case "ArrowRight":
        character.moveRight();
        break;
      default:
        break;
    }
  }
});

// Helper function to update the game state
function updateGameState(newState) {
  gameState = newState;
  document.getElementById("status").textContent = gameState;
}

// Helper function to update the game message
function updateGameMessage(message) {
  document.getElementById("message").textContent = message;
}

// Helper function to update the character position on the game board
function updateCharacterPosition() {
  const characterElement = document.getElementById("character");
  characterElement.style.top = character.y * TILE_SIZE + "px";
  characterElement.style.left = character.x * TILE_SIZE + "px";
}

// Initialize the game
initGame();

// Update the character position on the game board
updateCharacterPosition();

// Game loop
setInterval(() => {
  if (gameState === "inProgress") {
    // Update the character position on the game board
    updateCharacterPosition();

    // Check if the character has reached the destination
    if (character.x === destination.x && character.y === destination.y) {
      updateGameMessage("You have reached your destination!");

      // End the game
      updateGameState("end");
    }
  }
}, 100);

