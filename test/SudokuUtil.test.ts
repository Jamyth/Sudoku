import { SudokuUtil, Difficulty } from "../src/util/SudokuUtil";
import { describe, it } from "mocha";
import * as assert from "assert/strict";

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

        assert.deepEqual(puzzle, dummyPuzzle);
    });
    it("cipher correctly", () => {
        const cipheredPuzzle = SudokuUtil.cipherPuzzle(dummyPuzzle);
        assert.deepEqual(SudokuUtil.isValidPuzzle(cipheredPuzzle), true);
    });

    it("create playable puzzle", () => {
        const puzzle = SudokuUtil.createPuzzle(Difficulty.VERY_HARD);

        SudokuUtil.log(puzzle);
    });
});
