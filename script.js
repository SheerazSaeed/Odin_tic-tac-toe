function showModal(message) {
    const modal = document.getElementById('gameModal');
    const span = document.getElementsByClassName("close")[0];
    document.getElementById('modalText').textContent = message;
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Also close if anywhere outside of the modal is clicked
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

const board = ['', '', '', '', '', '', '', '', ''];
const computerSymbol = 'O';

/* The board Array represents the Tic Tac Toe game board of 9 cells. Each element corresponds to a cell on the board, initially set to an empty string indicating that the cell is unoccupied.
computerSymbol: This constant holds the symbol used by the computer, which is 'O'. */

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

/* Purpose: This function updates the webpage to reflect the current state of the game board.
Process:
Find the Board Container: Gets the board HTML element where the game is displayed.
Clear Previous Content: Empties the board element to clear any previous game states (i.e. the '' for innerHTML).
Create and Append Cells: Iterates over each cell (forEach) in the board array. For each cell, it:
Creates a new <div> element.
Sets its text to the current value of the cell (X, O, or empty).
Adds a click event listener that triggers the playerMove function when the cell is clicked.
Appends the new cell element to the board container.
*/

function playerMove(index) {
    const playerName = document.getElementById('playerName').value || 'Player';
    const playerSymbol = 'X';  
    if (!board[index] && !checkGameOver()) {
        board[index] = playerSymbol;
        renderBoard();
        if (!checkGameOver()) {
            setTimeout(computerMove, 300);
        }
    }
}

/* Purpose: Handles the player's move when they click on a cell.
Process:
Get Player Info: Retrieves the player's name from the input field. If the field is empty, defaults to "Player". The player symbol is hardcoded as 'X'.
Valid Move Check: Checks if the clicked cell is empty and the game is not over.
Update Board and Re-render: Sets the player's symbol in the selected cell, then re-renders the board.
Post-Move Actions: Checks if the game is over. If not, it schedules the computer's move to occur after a 300ms delay, creating a more natural gameplay flow.*/

function computerMove() {
    const availablePositions = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    if (availablePositions.length > 0) {
        const move = availablePositions[Math.floor(Math.random() * availablePositions.length)];
        board[move] = computerSymbol;
        renderBoard();
        checkGameOver();
    }
}

/* Purpose: Manages the computer's turn.
Process:
Find Empty Cells: Creates an array of indices of empty cells.
Random Move: Selects a random index from the available positions.
Update and Check: Sets the computer's symbol at the chosen index, re-renders the board, and checks if the game is over. */

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
            setTimeout(() => {
                showModal(`${winner} wins!`);
                board.fill('');
                renderBoard();
            }, 10);
        }
    });

    if (!gameWon && board.every(cell => cell !== '')) {
        setTimeout(() => {
            showModal("It's a tie!");
            board.fill('');
            renderBoard();
        }, 10);
    }

    return gameWon;
}

/* Purpose: Checks for a win or a tie after each move.
Process:
Win Check: Iterates through predefined winning combinations (rows, columns, diagonals). If any combination contains the same symbol across all its cells, a winner is declared.
Winner Declaration: Determines the winner based on the symbol in the winning cells. Displays an alert with the winner's name.
Tie Check: If no winner is found and all cells are filled, it declares a tie.
Board Reset and Update: Clears the board for a new game and re-renders it. 
SetTimeout so that the winning move is displayed.
*/

document.getElementById('start-game').addEventListener('click', () => {
    board.fill('');
    renderBoard();
});

/* Purpose: Provides a way to start a new game or reset the board.
Process:
Event Listener: Binds a click event to the "start-game" button.
Reset and Render: Clears the board array and re-renders the board to start fresh.*/

// Initial render of the board
renderBoard();
