export type SudokuBoard = (number | null)[][];
export type CompleteSudokuBoard = number[][];

export enum Difficulty {
    EASY = "EASY",
    MEDIUM = "MEDIUM",
    HARD = "HARD",
    VERY_HARD = "VERY_HARD",
    HELL = "HELL",
}

function assertPuzzle(numbers: SudokuBoard) {
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

function generatePuzzle(): CompleteSudokuBoard {
    const firstRow = generateNumber();
    // const firstRow = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const puzzle: CompleteSudokuBoard = [firstRow];

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
function toGrid(puzzle: SudokuBoard) {
    assertPuzzle(puzzle);
    const grids: SudokuBoard = [];
    for (let y = 0; y < 9; y += 3) {
        for (let x = 0; x < 9; x += 3) {
            const grid: (number | null)[] = [];
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

function toColumns(puzzle: SudokuBoard): (number | null)[][] {
    assertPuzzle(puzzle);
    const columns: SudokuBoard = [];

    for (let i = 0; i < 9; i++) {
        const column: (number | null)[] = [];
        let index = 0;
        while (index < 9) {
            column.push(puzzle[index++][i]);
        }
        columns.push(column);
    }

    return columns;
}

function isValidPuzzle(puzzle: CompleteSudokuBoard): boolean {
    assertPuzzle(puzzle);
    const isRowCorrect = puzzle.every(isValid);
    const isColumnCorrect = toColumns(puzzle).every(isValid);
    const isGridCorrect = toGrid(puzzle).every(isValid);

    return isRowCorrect && isColumnCorrect && isGridCorrect;
}

function columnsToPuzzle(columns: SudokuBoard): SudokuBoard {
    assertPuzzle(columns);
    const puzzle: SudokuBoard = [];

    for (let i = 0; i < 9; i++) {
        const row: (number | null)[] = [];
        let index = 0;
        while (index < 9) {
            row.push(columns[index++][i]);
        }
        puzzle.push(row);
    }

    return puzzle;
}

function isValid(numbers: (number | null)[]): boolean {
    return Array.from(new Set([...numbers])).length === 9;
}

function cipherPuzzle(puzzle: CompleteSudokuBoard): SudokuBoard {
    assertPuzzle(puzzle);
    let clonedPuzzle: SudokuBoard = JSON.parse(JSON.stringify(puzzle));
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

function solvable(_puzzle: SudokuBoard, _row = 0, _column = 0): { solvable: boolean; answer: CompleteSudokuBoard } {
    const puzzle: SudokuBoard = JSON.parse(JSON.stringify(_puzzle));
    let row = _row;
    let column = _column;

    if (row === 8 && column === 9) {
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
            const result = solvable(puzzle, row, column + 1);
            if (result.solvable) {
                return {
                    solvable: true,
                    answer: result.answer,
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

function isDigitComplete(board: SudokuBoard, row: number, column: number): boolean {
    const currentRow = board[row];
    const currentColumn = toColumns(board)[column];

    const gridIndex = Math.floor(row / 3) * 3 + Math.floor(column / 3);
    const grid = toGrid(board)[gridIndex];

    const hasAllNumber = [currentRow, currentColumn, grid].every((_) => Array.from(new Set([..._])).length === 9);

    return [...currentColumn, ...currentRow, ...grid].every((_) => _ !== null) && hasAllNumber;
}

function createPuzzle(difficulty: Difficulty): { board: SudokuBoard; answer: CompleteSudokuBoard } {
    const puzzle: SudokuBoard = cipherPuzzle(generatePuzzle());

    let digitToRemove;

    switch (difficulty) {
        case Difficulty.EASY:
            digitToRemove = 42;
            break;
        case Difficulty.MEDIUM:
            digitToRemove = 51;
            break;
        case Difficulty.HARD:
            digitToRemove = 60;
            break;
        case Difficulty.VERY_HARD:
            digitToRemove = 65;
            break;
        case Difficulty.HELL:
            digitToRemove = 69;
            break;
    }

    let playablePuzzle = removeDigit(puzzle, digitToRemove);
    let solution = solvable(playablePuzzle);

    while (!solution.solvable) {
        playablePuzzle = removeDigit(puzzle, digitToRemove);
        solution = solvable(playablePuzzle);
    }

    return {
        board: playablePuzzle,
        answer: solution.answer,
    };
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
        console.info("-   -   -   -   -   -   -   -   -");
    });
}

function hasDuplicate(board: SudokuBoard, row: number, column: number): boolean {
    const value = board[row][column];

    if (value === null) {
        return false;
    }

    const columns = toColumns(board);
    const currentColumn = columns[column];
    const currentRow = board[row];

    const isRowDuplicate = currentColumn.some((_, index) => _ === value && index !== row);
    const isColumnDuplicate = currentRow.some((_, index) => _ === value && index !== column);

    return isRowDuplicate || isColumnDuplicate;
}

function difficultyTranslate(difficulty: Difficulty): string {
    switch (difficulty) {
        case Difficulty.EASY:
            return "容易";
        case Difficulty.MEDIUM:
            return "中等";
        case Difficulty.HARD:
            return "困難";
        case Difficulty.VERY_HARD:
            return "專家";
        case Difficulty.HELL:
            return "邪惡";
    }
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
    hasDuplicate,
    difficultyTranslate,
    canSafeAssign,
    isDigitComplete,
});
