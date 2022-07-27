export type SudokuBoard = (number | null)[][];

export enum Difficulty {
    EASY = "EASY",
    MEDIUM = "MEDIUM",
    HARD = "HARD",
    VERY_HARD = "VERY_HARD",
}

function assertPuzzle(numbers: number[][]) {
    const isPuzzle = numbers.length === 9 && numbers.every((_) => _.length === 9);

    if (!isPuzzle) {
        throw new Error("[SudokuUtil]: assertPuzzle: value is not a valid puzzle (9 X 9 numbers))");
    }
}

function generateNumber(): number[] {
    const rows: number[] = [];

    for (let i = 1; i <= 9; i++) {
        let randomIndex = Math.floor(Math.random() * 9);
        while (rows[randomIndex] !== undefined) {
            randomIndex = Math.floor(Math.random() * 9);
        }
        rows[randomIndex] = i;
    }

    return rows;
}

function sliceToEnd(numbers: number[], interval = 3): number[] {
    const array = [...numbers];
    const head = array.splice(0, interval);
    return [...array, ...head];
}

function generatePuzzle(): number[][] {
    const firstRow = generateNumber();
    // const firstRow = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const puzzle: number[][] = [firstRow];

    for (let i = 1; i < 9; i++) {
        const index = i < 3 ? i - 1 : i - 3;
        const prevRow = puzzle[index];
        const currentRow = sliceToEnd(prevRow, i < 3 ? 3 : 1);
        puzzle.push(currentRow);
    }

    return puzzle;
}

/**
 * From Left to Right, Top to Bottom
 */
function toGrid(puzzle: number[][]) {
    assertPuzzle(puzzle);
    const grids: number[][] = [];
    for (let y = 0; y < 9; y += 3) {
        for (let x = 0; x < 9; x += 3) {
            const grid: number[] = [];
            grid.push(puzzle[y][x]);
            grid.push(puzzle[y][x + 1]);
            grid.push(puzzle[y][x + 2]);
            grid.push(puzzle[y + 1][x]);
            grid.push(puzzle[y + 1][x + 1]);
            grid.push(puzzle[y + 1][x + 2]);
            grid.push(puzzle[y + 2][x]);
            grid.push(puzzle[y + 2][x + 1]);
            grid.push(puzzle[y + 2][x + 2]);

            grids.push(grid);
        }
    }

    return grids;
}

function toColumns(puzzle: number[][]): number[][] {
    assertPuzzle(puzzle);
    const columns: number[][] = [];

    for (let i = 0; i < 9; i++) {
        const column: number[] = [];
        let index = 0;
        while (index < 9) {
            column.push(puzzle[index++][i]);
        }
        columns.push(column);
    }

    return columns;
}

function isValidPuzzle(puzzle: number[][]): boolean {
    assertPuzzle(puzzle);
    const isRowCorrect = puzzle.every(isValid);
    const isColumnCorrect = toColumns(puzzle).every(isValid);
    const isGridCorrect = toGrid(puzzle).every(isValid);

    return isRowCorrect && isColumnCorrect && isGridCorrect;
}

function columnsToPuzzle(columns: number[][]): number[][] {
    assertPuzzle(columns);
    const puzzle: number[][] = [];

    for (let i = 0; i < 9; i++) {
        const row: number[] = [];
        let index = 0;
        while (index < 9) {
            row.push(columns[index++][i]);
        }
        puzzle.push(row);
    }

    return puzzle;
}

function isValid(numbers: number[]): boolean {
    return Array.from(new Set([...numbers])).length === 9;
}

function cipherPuzzle(puzzle: number[][]): number[][] {
    assertPuzzle(puzzle);
    let clonedPuzzle: number[][] = JSON.parse(JSON.stringify(puzzle));
    const combination = [
        [0, 1],
        [0, 2],
        [1, 2],
    ];
    for (let i = 0; i < 6; i++) {
        // decide swapping for grid 1 - grid 3
        const modifications = Math.floor(Math.random() * 3);
        const direction = Math.floor(Math.random() * 2) === 1 ? "row" : "column";
        const selectedCombinations = Array.from({ length: modifications }).map(() => {
            const randomIndex = Math.floor(Math.random() * combination.length);
            return combination[randomIndex];
        });

        selectedCombinations.forEach(([a, b], index) => {
            const firstIndex = a + index * 3;
            const secondIndex = b + index * 3;
            if (direction === "row") {
                const tmpRow = clonedPuzzle[firstIndex];
                clonedPuzzle[firstIndex] = clonedPuzzle[secondIndex];
                clonedPuzzle[secondIndex] = tmpRow;
            } else {
                const columns = toColumns(clonedPuzzle);
                const tmpColumn = columns[firstIndex];
                columns[firstIndex] = columns[secondIndex];
                columns[secondIndex] = tmpColumn;
                clonedPuzzle = columnsToPuzzle(columns);
            }
        });
    }

    return clonedPuzzle;
}

function solvable(_puzzle: SudokuBoard, _row = 0, _column = 0): { solvable: boolean; answer: number[][] } {
    const puzzle: SudokuBoard = JSON.parse(JSON.stringify(_puzzle));
    let row = _row;
    let column = _column;

    if (row === 8 && column === 8) {
        return {
            solvable: true,
            answer: puzzle as number[][],
        };
    }

    if (column === 9) {
        row++;
        column = 0;
    }

    if (puzzle[row][column] !== null) {
        return solvable(puzzle, row, column + 1);
    }

    for (let value = 1; value <= 9; value++) {
        if (canSafeAssign(puzzle, row, column, value)) {
            puzzle[row][column] = value;

            if (solvable(puzzle, row, column + 1)) {
                return {
                    solvable: true,
                    answer: puzzle as number[][],
                };
            }
        }

        puzzle[row][column] = null;
    }
    return {
        solvable: false,
        answer: [],
    };
}

function canSafeAssign(puzzle: SudokuBoard, row: number, column: number, value: number): boolean {
    for (let x = 0; x <= 8; x++) {
        if (puzzle[row][x] === value) {
            return false;
        }
    }

    for (let x = 0; x <= 8; x++) {
        if (puzzle[x][column] === value) {
            return false;
        }
    }

    const startRow = row - (row % 3);
    const startColumn = column - (column % 3);

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (puzzle[i + startRow][j + startColumn] === value) {
                return false;
            }
        }
    }

    return true;
}

function createPuzzle(difficulty: Difficulty): SudokuBoard {
    const puzzle: SudokuBoard = cipherPuzzle(generatePuzzle());

    let digitToRemove;

    switch (difficulty) {
        case Difficulty.EASY:
            digitToRemove = 15;
            break;
        case Difficulty.MEDIUM:
            digitToRemove = 35;
            break;
        case Difficulty.HARD:
            digitToRemove = 45;
            break;
        case Difficulty.VERY_HARD:
            digitToRemove = 64;
            break;
    }

    let playablePuzzle = removeDigit(puzzle, digitToRemove);

    while (!solvable(playablePuzzle)) {
        playablePuzzle = removeDigit(puzzle, digitToRemove);
    }

    return playablePuzzle;
}

function removeDigit(_puzzle: SudokuBoard, numberToRemove: number): SudokuBoard {
    const puzzle = JSON.parse(JSON.stringify(_puzzle));
    for (let i = 0; i < numberToRemove; i++) {
        let rowIndex = Math.floor(Math.random() * 9);
        let columnIndex = Math.floor(Math.random() * 9);
        while (puzzle[rowIndex][columnIndex] === null) {
            rowIndex = Math.floor(Math.random() * 9);
            columnIndex = Math.floor(Math.random() * 9);
        }
        const row = [...puzzle[rowIndex]];
        row[columnIndex] = null;
        puzzle[rowIndex] = row;
    }
    return puzzle;
}

function log(puzzle: SudokuBoard) {
    puzzle.forEach((_) => {
        console.info(_.join(" | "));
    });
}

export const SudokuUtil = Object.freeze({
    generateNumber,
    sliceToEnd,
    generatePuzzle,
    toGrid,
    toColumns,
    isValidPuzzle,
    columnsToPuzzle,
    cipherPuzzle,
    solvable,
    createPuzzle,
    log,
});
