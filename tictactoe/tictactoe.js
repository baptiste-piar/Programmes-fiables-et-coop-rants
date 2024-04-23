const container = document.querySelector('.container');
const cells = [];

let currentPlayer = 'X';
let winner = null;

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a];
        }
    }
    if (cells.every(cell => cell !== null)) {
        return 'tie';
    }
    return null;
}

function handleCellClick(index) {
    if (winner || cells[index]) return;
    cells[index] = currentPlayer;
    render();
    winner = checkWinner();
    if (winner === 'tie') {
        alert('It\'s a tie !');
    } else if (winner) {
        alert(`Player ${winner} wins !`);
    } else {
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    }
}

function render() {
    container.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = cells[index];
            cell.addEventListener('click', () => handleCellClick(index));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function init() {
    for (let i = 0; i < 9; i++) {
        cells.push(null);
    }
    render();
}

init();