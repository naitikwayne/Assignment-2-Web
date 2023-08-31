// Constants
const BOARD_SIZE = 4;
const TILE_COUNT = BOARD_SIZE * BOARD_SIZE;
const SIMPLE_GAME_TILE = TILE_COUNT;

// Variables
let tiles = [];
let emptyTile = TILE_COUNT;
let moveCount = 0;
let timerInterval;
let startTime;

// Function to create a shuffled array of tiles
function shuffleTiles() {
    const shuffledTiles = Array.from({ length: TILE_COUNT }, (_, i) => i + 1);
    for (let i = shuffledTiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledTiles[i], shuffledTiles[j]] = [shuffledTiles[j], shuffledTiles[i]];
    }
    return shuffledTiles;
}

// Function to create the puzzle board
function createBoard() {
    const board = document.getElementById('puzzleBoard');
    board.innerHTML = '';

    for (let row = 0; row < BOARD_SIZE; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < BOARD_SIZE; col++) {
            const td = document.createElement('td');
            const tileNumber = tiles[row * BOARD_SIZE + col];

            if (tileNumber !== emptyTile) {
                td.textContent = tileNumber;
                td.classList.add('tile');
                td.addEventListener('click', () => handleTileClick(row, col));
            } else {
                td.classList.add('empty');
            }

            tr.appendChild(td);
        }
        board.appendChild(tr);
    }
}

// Function to handle tile click
function handleTileClick(row, col) {
    console.log("Came into tile click")
    const tileNumber = tiles[row * BOARD_SIZE + col];
    if (isAdjacent(row, col)) {
        moveTile(row, col);
        moveCount++;
        document.getElementById('moveCounter').textContent = moveCount;

        if (checkWin()) {
            clearInterval(timerInterval);
            alert(`Congratulations! You solved the puzzle in ${moveCount} moves and ${Math.floor((Date.now() - startTime) / 1000)} seconds.`);
            resetGame();
        }
    }
}

// Function to check if a tile is adjacent to the empty slot
function isAdjacent(row, col) {
    const emptyRow = Math.floor(emptyTile / BOARD_SIZE);
    const emptyCol = emptyTile % BOARD_SIZE;
    return (
        (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
        (col === emptyCol && Math.abs(row - emptyRow) === 1)
    );
}

// Function to move a tile to the empty slot
function moveTile(row, col) {
    console.log("Came into move tile")
    const tileNumber = tiles[row * BOARD_SIZE + col];
    tiles[row * BOARD_SIZE + col] = emptyTile;
    emptyTile = tileNumber;
    createBoard();
}

// Function to check if the puzzle is solved
function checkWin() {
    for (let i = 0; i < TILE_COUNT - 1; i++) {
        if (tiles[i] !== i + 1) {
            return false;
        }
    }
    return true;
}

// Function to reset the game
function resetGame() {
    moveCount = 0;
    document.getElementById('moveCounter').textContent = moveCount;

    tiles = shuffleTiles();
    emptyTile = SIMPLE_GAME_TILE; // For the simple game, one tile is out of place
    createBoard();

    clearInterval(timerInterval);
    document.getElementById('timer').textContent = '0';
}

// Function to start the timer
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const currentTime = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById('timer').textContent = currentTime;
    }, 1000);
}

// Event listeners for buttons
document.getElementById('newGameBtn').addEventListener('click', resetGame);
document.getElementById('simpleGameBtn').addEventListener('click', () => {
    resetGame();
    startTimer();
});

// Initialize the game
resetGame();
