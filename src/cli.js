// src/cli.js
import { generateSudoku } from "./sudoku.js";
import { Command } from "commander";

const program = new Command();
program
    .option("-s, --seed <number>", "Graine pour la génération reproductible", parseInt)
    .parse(process.argv);

const options = program.opts();
const seed = options.seed || Math.floor(Math.random() * 10000);
const grid = generateSudoku(seed);
displayGrid(grid);

console.log(`
Graine utilisée : ${seed} (utilisez --seed ${seed} pour reproduire cette grille)`);

function displayGrid(grid) {
    console.log("+-------+-------+-------+");
    for (let i = 0; i < 9; i++) {
        let rowStr = "| ";
        for (let j = 0; j < 9; j++) {
            rowStr += grid[i][j] === 0 ? "  " : grid[i][j] + " ";
            if ((j + 1) % 3 === 0) rowStr += "| ";
        }
        console.log(rowStr);
        if ((i + 1) % 3 === 0) console.log("+-------+-------+-------+");
    }
}
