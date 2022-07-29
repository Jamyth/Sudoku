import type { PlayableSudokuBoard, ActionMode, InteractSudoku } from "util/GameUtil";
import type { Difficulty, CompleteSudokuBoard } from "../../util/SudokuUtil";

export type Path = "/";

export interface State {
    board: null | PlayableSudokuBoard;
    answer: CompleteSudokuBoard | null;
    selectedCell: InteractSudoku | null;
    selectedMode: ActionMode.DRAFT | null;
    tipsQuota: number;
    errorCount: number;
    isVictory: boolean;
}

export interface HistoryState {
    difficulty: Difficulty;
}
