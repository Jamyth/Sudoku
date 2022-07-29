import { Module, register } from "react-shiba";
import { Main } from "./Main";
import type { InteractSudoku } from "util/GameUtil";
import { ActionMode, GameUtil } from "util/GameUtil";
import { Difficulty, SudokuUtil } from "util/SudokuUtil";
import type { Location } from "react-shiba";
import type { State, Path, HistoryState } from "./type";
import { ArrayUtil } from "@iamyth/util";

const initialState: State = {
    board: null,
    answer: null,
    selectedCell: null,
    selectedMode: null,
    tipsQuota: 3,
    errorCount: 3,
    isVictory: false,
};

class ModuleGameModule extends Module<Path, State> {
    override onLocationMatched(routeParams: object, location: Location<HistoryState>): void {
        // TODO/Jamyth
        const difficulty = location.state?.difficulty ?? Difficulty.MEDIUM;

        if (!difficulty) {
            this.pushHistory("/");
        }

        const board = GameUtil.createBoard(difficulty);
        const answer = SudokuUtil.solvable(GameUtil.toPureSudokuBoard(board)).answer;

        this.setState({
            board,
            answer,
        });
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
            let randomRow = Math.floor(Math.random() * 8);
            let randomColumn = Math.floor(Math.random() * 8);
            let cell = board[randomRow][randomColumn];
            while (cell.isGenerated || cell.value !== null) {
                randomRow = Math.floor(Math.random() * 8);
                randomColumn = Math.floor(Math.random() * 8);
                cell = board[randomRow][randomColumn];
            }

            const value = answer[randomRow][randomColumn];
            this.setState((state) => {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked
                state.board![randomRow][randomColumn] = {
                    value,
                    isGenerated: true,
                    row: randomRow,
                    column: randomColumn,
                    draft: [],
                };
                state.tipsQuota--;
            });
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

    onNumberClick(value: number) {
        const board = this.state.board;
        const isDraftMode = this.state.selectedMode !== null;
        const rawCell = this.state.selectedCell;
        const answer = this.state.answer;

        if (!rawCell) {
            return;
        }

        const selectedCell: InteractSudoku = JSON.parse(JSON.stringify(this.state.selectedCell));
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
        this.setState((state) => {
            state.errorCount = value === correctAnswer ? state.errorCount : state.errorCount - 1;
            state.selectedCell = cell;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked
            state.board![row][column] = cell;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked
            state.isVictory = GameUtil.isVictory(state.board!, state.answer!);
        });
    }
}

const moduleGameModule = register(new ModuleGameModule("/", initialState));
export const useState = moduleGameModule.getState();
export const actions = moduleGameModule.getActions();
export const MainComponent = moduleGameModule.attachLifecycle(Main);
