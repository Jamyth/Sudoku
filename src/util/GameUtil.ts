import { ArrayUtil } from "@iamyth/util/dist/cjs/core/ArrayUtil";
import { SudokuUtil } from "./SudokuUtil";
import type { SudokuBoard, CompleteSudokuBoard, Difficulty } from "./SudokuUtil";
import { BEST_TIME_KEY } from "./StorageKey";

export interface InteractSudoku {
    value: number | null;
    isGenerated: boolean;
    row: number;
    column: number;
    draft: number[];
}

export enum ActionMode {
    CLEAN = "CLEAN",
    DRAFT = "DRAFT",
    TIPS = "TIPS",
}

export type PlayableSudokuBoard = InteractSudoku[][];

function createBoard(difficulty: Difficulty): { board: PlayableSudokuBoard; answer: CompleteSudokuBoard } {
    const { board, answer } = SudokuUtil.createPuzzle(difficulty);
    return { board: toPlayableSudokuBoard(board), answer };
}

function toPureSudokuBoard(board: PlayableSudokuBoard): SudokuBoard {
    return board.map((_) => _.map((_) => _.value));
}

function toPlayableSudokuBoard(board: SudokuBoard): PlayableSudokuBoard {
    return board.map((_, row) =>
        _.map((value, column) => ({
            value,
            isGenerated: value !== null,
            row,
            column,
            draft: [],
        })),
    );
}

function isVictory(board: PlayableSudokuBoard, answer: CompleteSudokuBoard): boolean {
    const boardNumbers = toPureSudokuBoard(board).reduce((acc, curr) => [...acc, ...curr], []);
    const answerNumbers = answer.reduce((acc, curr) => [...acc, ...curr], []);

    return ArrayUtil.areSame(boardNumbers, answerNumbers, true);
}

function translateActionMode(mode: ActionMode): string {
    switch (mode) {
        case ActionMode.CLEAN:
            return "清除";
        case ActionMode.DRAFT:
            return "草稿";
        case ActionMode.TIPS:
            return "提示";
    }
}

function getInteractSudokuOf(board: PlayableSudokuBoard, value: number): InteractSudoku[] {
    const sudoku: InteractSudoku[] = [];
    board.forEach((_) => {
        _.forEach((_) => {
            if (_.value === value) {
                sudoku.push(_);
            }
        });
    });

    return sudoku;
}

function getBestTime(): Record<Difficulty, number> | null;
function getBestTime(difficulty: Difficulty): number | null;
function getBestTime(difficulty?: Difficulty) {
    const rawData = localStorage.getItem(BEST_TIME_KEY);
    if (rawData) {
        const data: Record<Difficulty, number> = JSON.parse(rawData);
        if (difficulty) {
            return data[difficulty];
        }

        return data;
    }

    return null;
}

function toTimeString(time: number) {
    const minutes = Math.floor(time / 60);
    const second = time % 60;

    return `${minutes.toString().padStart(2, "0")} : ${second.toString().padStart(2, "0")}`;
}

export const GameUtil = Object.freeze({
    toPureSudokuBoard,
    toPlayableSudokuBoard,
    createBoard,
    translateActionMode,
    getInteractSudokuOf,
    isVictory,
    getBestTime,
    toTimeString,
});
