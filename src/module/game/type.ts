import type { PlayableSudokuBoard, ActionMode, InteractSudoku } from "util/GameUtil";
import type { Difficulty, CompleteSudokuBoard } from "../../util/SudokuUtil";

export type Path = "/game";

export interface State {
    difficulty: Difficulty | null;
    board: null | PlayableSudokuBoard;
    answer: CompleteSudokuBoard | null;
    selectedCell: InteractSudoku | null;
    selectedMode: ActionMode.DRAFT | null;
    tipsQuota: number;
    errorCount: number;
    isVictory: boolean;
    elapsedTime: number;
    isPaused: boolean;
}

export interface HistoryState {
    difficulty: Difficulty;
}
