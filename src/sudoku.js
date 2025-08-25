// src/sudoku.js
export function generateSudoku(seed) {
  const random = seedRandom(seed);
  let grid = Array(9)
    .fill()
    .map(() => Array(9).fill(0));
  fillGrid(grid, random);
  return removeCells(grid, random, 30);
}

function fillGrid(grid, random, row = 0, col = 0) {
  if (row === 9) return true;
  if (col === 9) return fillGrid(grid, random, row + 1, 0);
  if (grid[row][col] !== 0) return fillGrid(grid, random, row, col + 1);

  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => random() - 0.5);
  for (const num of nums) {
    if (isValid(grid, row, col, num)) {
      grid[row][col] = num;
      if (fillGrid(grid, random, row, col + 1)) return true;
      grid[row][col] = 0;
    }
  }
  return false;
}

function isValid(grid, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === num || grid[i][col] === num) return false;
  }
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[startRow + i][startCol + j] === num) return false;
    }
  }
  return true;
}

function removeCells(grid, random, cellsToRemove) {
  const newGrid = grid.map((row) => [...row]);
  let cellsRemoved = 0;
  while (cellsRemoved < cellsToRemove) {
    const row = Math.floor(random() * 9);
    const col = Math.floor(random() * 9);
    if (newGrid[row][col] !== 0) {
      newGrid[row][col] = 0;
      cellsRemoved++;
    }
  }
  return newGrid;
}

function seedRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return () => {
    x = (x * 9301 + 49297) % 233280;
    return x / 233280;
  };
}
