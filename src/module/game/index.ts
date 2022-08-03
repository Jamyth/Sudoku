import { Module, register } from "react-shiba";
import { Main } from "./Main";
import type { InteractSudoku } from "util/GameUtil";
import { ActionMode, GameUtil } from "util/GameUtil";
import { actions as mainActions } from "module/main";
import type { Location } from "react-shiba";
import type { State, Path, HistoryState } from "./type";
import { ArrayUtil } from "@iamyth/util/dist/cjs/core/ArrayUtil";
import { GAME_STORAGE_KEY } from "util/StorageKey";
import { SudokuUtil } from "util/SudokuUtil";

const initialState: State = {
    difficulty: null,
    board: null,
    answer: null,
    selectedCell: null,
    selectedMode: null,
    tipsQuota: 5,
    errorCount: 3,
    isVictory: false,
    elapsedTime: 0,
    isPaused: false,
};

class ModuleGameModule extends Module<Path, State> {
    override onLocationMatched(routeParams: object, location: Location<HistoryState>): void {
        const difficulty = location.state?.difficulty;
        const rawData = localStorage.getItem(GAME_STORAGE_KEY);
        if (!difficulty && rawData) {
            this.setState(JSON.parse(rawData));
            return;
        }
        if (!difficulty) {
            this.pushHistory("/");
            return;
        }
        const { board, answer } = GameUtil.createBoard(difficulty);

        this.setState({
            ...initialState,
            board,
            answer,
            difficulty,
        });

        this.saveGame();
    }

    increaseTime() {
        if (!this.state.isVictory && !this.state.isPaused) {
            this.setState((state) => state.elapsedTime++);
            this.saveGame();
        }
    }

    pauseOrResumeGame() {
        this.setState((state) => (state.isPaused = !state.isPaused));
    }

    selectMode(mode: ActionMode) {
        const { selectedMode, selectedCell, board, answer, tipsQuota } = this.state;

        if (!board || !answer) {
            return;
        }

        const isFinishedBoard = GameUtil.toPureSudokuBoard(board)
            .reduce((acc, curr) => {
                return [...acc, ...curr];
            }, [])
            .every((_) => _ !== null);

        if (mode === ActionMode.DRAFT) {
            this.setState({ selectedMode: selectedMode === mode ? null : mode });
            return;
        }

        if (mode === ActionMode.CLEAN && selectedCell !== null) {
            this.setState((state) => {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked
                const cell = state.selectedCell!;
                state.selectedCell = {
                    ...cell,
                    value: cell.isGenerated ? cell.value : null,
                    draft: [],
                };
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked
                state.board![cell.row][cell.column] = state.selectedCell;
            });
        }

        if (mode === ActionMode.TIPS && !isFinishedBoard && tipsQuota > 0) {
            const emptyCells = board.reduce((acc, curr) => [...acc, ...curr], []).filter((_) => _.value === null);
            const randomCellIndex = Math.floor(Math.random() * emptyCells.length);
            const cell = emptyCells[randomCellIndex];
            const value = answer[cell.row][cell.column];
            this.setState((state) => {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked
                state.board![cell.row][cell.column] = {
                    value,
                    isGenerated: true,
                    row: cell.row,
                    column: cell.column,
                    draft: [],
                };
                state.tipsQuota--;
            });
            this.checkIsVictory();
        }
    }

    selectCell(cell: InteractSudoku) {
        const selectedCell = this.state.selectedCell;

        if (selectedCell?.row === cell.row && selectedCell?.column === cell.column) {
            this.setState({ selectedCell: null });
            return;
        }

        this.setState({ selectedCell: cell });
    }

    // eslint-disable-next-line sonarjs/cognitive-complexity -- fix later
    onNumberClick(value: number) {
        const board = this.state.board;
        const isDraftMode = this.state.selectedMode !== null;
        const rawCell = this.state.selectedCell;
        const answer = this.state.answer;

        if (!rawCell) {
            return;
        }

        const selectedCell: InteractSudoku = JSON.parse(JSON.stringify(rawCell));
        const { row, column } = selectedCell;

        if (!board || !answer) {
            return;
        }

        let cell: InteractSudoku;
        const correctAnswer = answer[selectedCell.row][selectedCell.column];

        if (isDraftMode) {
            const draft = ArrayUtil.toggleElement(selectedCell.draft, value);
            cell = {
                ...selectedCell,
                draft,
            };
        } else {
            cell = {
                ...selectedCell,
                value: selectedCell.value === value ? null : value,
            };
        }

        if (value === correctAnswer) {
            board.forEach((row) => {
                row.forEach((_) => {
                    const isSameGrid = SudokuUtil.isInSameGrid(cell.row, cell.column, _.row, _.column);
                    const isSameRow = cell.row === _.row;
                    const isSameColumn = cell.column === _.column;
                    const isSameBlock = isSameColumn && isSameRow;
                    if ((isSameColumn || isSameRow || isSameGrid) && !isSameBlock && _.draft.includes(value)) {
                        ArrayUtil.toggleElement(_.draft, value);
                        const draftCell: InteractSudoku = JSON.parse(JSON.stringify(_));
                        draftCell.draft = ArrayUtil.toggleElement(draftCell.draft, value);
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked
                        this.setState((state) => (state.board![draftCell.row][draftCell.column] = draftCell));
                    }
                });
            });
        }
        this.setState((state) => {
            if (state.selectedMode === null && selectedCell.value !== value) {
                state.errorCount = value === correctAnswer ? state.errorCount : state.errorCount - 1;
            }
            state.selectedCell = cell;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked
            state.board![row][column] = cell;
        });

        this.saveGame();
        this.checkIsVictory();
    }

    checkIsVictory() {
        const { board, answer, difficulty } = this.state;
        if (!board || !answer || !difficulty) {
            return;
        }
        const isFinishedBoard = GameUtil.toPureSudokuBoard(board)
            .reduce((acc, curr) => {
                return [...acc, ...curr];
            }, [])
            .every((_) => _ !== null);
        if (!isFinishedBoard) {
            return;
        }
        const isVictory = GameUtil.isVictory(board, answer);
        if (isVictory) {
            mainActions.completeGame(difficulty);
            localStorage.removeItem(GAME_STORAGE_KEY);
        }
        this.setState({ isVictory });
    }

    private saveGame() {
        localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify(this.state));
    }
}

const moduleGameModule = register(new ModuleGameModule("/game", initialState));
export const useState = moduleGameModule.getState();
export const actions = moduleGameModule.getActions();
export const MainComponent = moduleGameModule.attachLifecycle(Main);
