import { SudokuUtil, Difficulty } from "../src/util/SudokuUtil";
import { describe, it } from "mocha";
import { strict as assert } from "assert";

describe("SudokuUtil", () => {
    const dummyPuzzle = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 6, 7, 8, 9, 1],
        [5, 6, 7, 8, 9, 1, 2, 3, 4],
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [9, 1, 2, 3, 4, 5, 6, 7, 8],
    ];

    const puzzle = [
        [null, null, null, null, null, null, 6, null, 9],
        [1, null, null, null, null, 4, null, null, null],
        [null, null, 5, 3, null, 6, 8, 2, 1],
        [null, null, 4, 6, 7, null, null, 5, null],
        [null, null, 7, null, null, null, 9, null, null],
        [null, null, null, 5, 4, null, null, null, null],
        [3, 7, null, 4, null, 5, 2, null, 6],
        [null, null, null, null, null, null, 5, 1, null],
        [null, 6, null, null, 2, null, null, 3, 7],
    ];

    it("generates numbers without duplication", () => {
        const numbers = SudokuUtil.generateNumber();
        const set = Array.from(new Set([...numbers]));

        assert.deepEqual(set.length, 9);
    });

    it("generated numbers are in 1-9", () => {
        const numbers = SudokuUtil.generateNumber();
        const isInRange = numbers.every((_) => _ > 0 && _ < 10);
        assert.deepEqual(isInRange, true);
    });

    it("Slice Number Correctly for 3", () => {
        const row = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const sliced = SudokuUtil.sliceToEnd(row, 3);

        const expected = [4, 5, 6, 7, 8, 9, 1, 2, 3];
        assert.deepEqual(sliced, expected);
    });

    it("Slice Number Correctly for 1", () => {
        const row = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const sliced = SudokuUtil.sliceToEnd(row, 1);

        const expected = [2, 3, 4, 5, 6, 7, 8, 9, 1];
        assert.deepEqual(sliced, expected);
    });

    it("generate puzzle", () => {
        const puzzle = SudokuUtil.generatePuzzle();
        const has9Length = puzzle.every((_) => _.length === 9);
        assert.deepEqual(puzzle.length, 9);
        assert.deepEqual(has9Length, true);
    });

    it("slice grid correctly", () => {
        const grids = SudokuUtil.toGrid(dummyPuzzle);
        const grid4 = [5, 6, 7, 8, 9, 1, 2, 3, 4];

        assert.deepEqual(grids[4], grid4);
    });

    it("slice columns correctly", () => {
        const columns = SudokuUtil.toColumns(dummyPuzzle);
        const column4 = [4, 7, 1, 5, 8, 2, 6, 9, 3];

        assert.deepEqual(columns[3], column4);
    });

    it("columns to puzzle", () => {
        const columns = SudokuUtil.toColumns(dummyPuzzle);
        const puzzle = SudokuUtil.columnsToPuzzle(columns);

        assert.deepStrictEqual(puzzle, dummyPuzzle);
    });
    it("cipher correctly", () => {
        const cipheredPuzzle = SudokuUtil.cipherPuzzle(dummyPuzzle);
        assert.deepEqual(SudokuUtil.isValidPuzzle(cipheredPuzzle), true);
    });

    it("create playable puzzle", () => {
        const puzzle = SudokuUtil.createPuzzle(Difficulty.VERY_HARD);

        // SudokuUtil.log(puzzle);
    });

    it("solve the puzzle", (done) => {
        const answer = SudokuUtil.solvable(puzzle);

        // SudokuUtil.log(answer.answer);
        done();
    });

    it("find duplicate value", () => {
        const dummyPuzzle = [
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [4, 2, 6, 7, 8, 9, 1, 2, 3],
            [7, 8, 9, 1, 2, 3, 4, 5, 6],
            [2, 3, 4, 5, 6, 7, 8, 9, 1],
            [5, 6, 7, 8, 9, 1, 2, 3, 4],
            [8, 9, 1, 2, 3, 4, 5, 6, 7],
            [3, 4, 5, 6, 7, 8, 9, 1, 2],
            [6, 7, 8, 9, 1, 2, 3, 4, 5],
            [9, 1, 2, 3, 4, 5, 6, 7, 8],
        ];
        // value 2 has duplicate in row 2 and column 2
        const hasDuplicateBoth = SudokuUtil.hasDuplicate(dummyPuzzle, 1, 1);
        const hasDuplicateRow = SudokuUtil.hasDuplicate(dummyPuzzle, 0, 1);
        const hasDuplicateColumn = SudokuUtil.hasDuplicate(dummyPuzzle, 1, 0);
        const dontHaveDuplicate = SudokuUtil.hasDuplicate(dummyPuzzle, 0, 0);

        assert.deepEqual(hasDuplicateBoth, true);
        assert.deepEqual(hasDuplicateRow, true);
        assert.deepEqual(hasDuplicateColumn, true);
        assert.deepEqual(dontHaveDuplicate, false);
    });

    it("validate Row and Column and Grid", () => {
        const wrongDummyPuzzle = [
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [4, 2, 6, 7, 8, 9, 1, 2, 3],
            [7, 8, 9, 1, 2, 3, 4, 5, 6],
            [2, 3, 4, 5, 6, 7, 8, 9, 1],
            [5, 6, 7, 8, 9, 1, 2, 3, 4],
            [8, 9, 1, 2, 3, 4, 5, 6, 7],
            [3, 4, 5, 6, 7, 8, 9, 1, 2],
            [6, 7, 8, 9, 1, 2, 3, 4, 5],
            [9, 1, 2, 3, 4, 5, 6, 7, 8],
        ];
        const isPass = SudokuUtil.isDigitComplete(dummyPuzzle, 8, 7);
        const notPass = SudokuUtil.isDigitComplete(wrongDummyPuzzle, 2, 2);

        assert.deepEqual(isPass, true);
        assert.deepEqual(notPass, false);
    });
});
