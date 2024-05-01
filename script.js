const board = ['', '', '', '', '', '', '', '', ''];
const computerSymbol = 'O';

function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => playerMove(index));
        boardElement.appendChild(cellElement);
    });
}

function playerMove(index) {
    const playerName = document.getElementById('playerName').value || 'Player';
    const playerSymbol = 'X';  // The symbol for the player is still 'X', but it can also be customized if needed.
    if (!board[index] && !checkGameOver()) {
        board[index] = playerSymbol;
        renderBoard();
        if (!checkGameOver()) {
            setTimeout(computerMove, 300);
        }
    }
}

function computerMove() {
    const availablePositions = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    if (availablePositions.length > 0) {
        const move = availablePositions[Math.floor(Math.random() * availablePositions.length)];
        board[move] = computerSymbol;
        renderBoard();
        checkGameOver();
    }
}

function checkGameOver() {
    const playerName = document.getElementById('playerName').value || 'Player';
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    let gameWon = false;
    winningCombinations.forEach((combo) => {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
            gameWon = true;
            const winner = board[combo[0]] === 'X' ? playerName : "Computer";
            alert(`${winner} wins!`);
            board.fill('');
        }
    });

    if (!gameWon && board.every(cell => cell !== '')) {
        alert("It's a tie!");
        board.fill('');
    }
    renderBoard();
    return gameWon;
}

document.getElementById('start-game').addEventListener('click', () => {
    board.fill('');
    renderBoard();
});

// Initial render of the board
renderBoard();
