document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const size = 10;
    const bombCount = 20;
    const boardArray = [];
    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.setAttribute('data-row', i);
          cell.setAttribute('data-col', j);
          row.push(cell);
          board.appendChild(cell);
        }
        boardArray.push(row);
    }
    for (let i = 0; i < bombCount; i++) {
        let row, col;
        do {
          row = Math.floor(Math.random() * size);
          col = Math.floor(Math.random() * size);
        } while (boardArray[row][col].classList.contains('bomb'));
        boardArray[row][col].classList.add('bomb');
    }
    function countAdjacentBombs(row, col) {
        let count = 0;
        for (let i = Math.max(0, row - 1); i <= Math.min(row + 1, size - 1); i++) {
          for (let j = Math.max(0, col - 1); j <= Math.min(col + 1, size - 1); j++) {
            if (boardArray[i][j].classList.contains('bomb')) {
              count++;
            }
          }
        }
        return count;
    }
    board.addEventListener('click', handleCellClick);
    function handleCellClick(event) {
        const cell = event.target;
        if (event.altKey) {
            if (!cell.classList.contains('revealed')) {
                cell.classList.toggle('marked');
                cell.textContent = (cell.textContent === 'D') ? '' : 'D';
            }
        }
        else {
            const row = parseInt(cell.getAttribute('data-row'));
            const col = parseInt(cell.getAttribute('data-col'));
            if (cell.classList.contains('bomb')) {
                revealBombs();
                alert('Game Over !');
            }
            else {
                const count = countAdjacentBombs(row, col);
                cell.textContent = count;
                cell.classList.add('revealed');
                cell.style.backgroundColor = '#fff';
                if (count === 0) {
                    revealAdjacentCells(row, col);
                }
            }
        }
    }
    function revealBombs() {
        boardArray.flat().filter(cell => cell.classList.contains('bomb'))
                       .forEach(bomb => bomb.classList.add('revealed'));
    }
});