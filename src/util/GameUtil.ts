import { SudokuUtil } from "./SudokuUtil";
import type { SudokuBoard, Difficulty } from "./SudokuUtil";

interface InteractSudoku {
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

function createBoard(difficulty: Difficulty): PlayableSudokuBoard {
    return toPlayableSudokuBoard(SudokuUtil.createPuzzle(difficulty));
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

export const GameUtil = Object.freeze({
    toPureSudokuBoard,
    toPlayableSudokuBoard,
    createBoard,
    translateActionMode,
});
