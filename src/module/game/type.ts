import type { PlayableSudokuBoard, ActionMode } from "util/GameUtil";
import type { Difficulty } from "../../util/SudokuUtil";

export type Path = "/";

export interface State {
    board: null | PlayableSudokuBoard;
    selectedNumber: number | null;
    selectedCell: [row: number, column: number] | null;
    selectedMode: ActionMode | null;
}

export interface HistoryState {
    difficulty: Difficulty;
}
