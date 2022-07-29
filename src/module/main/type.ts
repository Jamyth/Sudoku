import type { Difficulty } from "util/SudokuUtil";

export type Path = never;

export interface State {
    passedGame: Record<Difficulty, number>;
    drawerOpened: boolean | Difficulty;
}
