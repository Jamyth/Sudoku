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
        const { selectedMode } = this.state;
        if (mode === ActionMode.DRAFT) {
            this.setState({ selectedMode: selectedMode === mode ? null : mode });
            return;
        }

        if (mode === ActionMode.CLEAN) {
            //
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

        if (!rawCell) {
            return;
        }

        const selectedCell: InteractSudoku = JSON.parse(JSON.stringify(this.state.selectedCell));
        const { row, column } = selectedCell;

        if (!board) {
            return;
        }

        let cell: InteractSudoku;

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
            state.selectedCell = cell;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked
            state.board![row][column] = cell;
        });
    }
}

const moduleGameModule = register(new ModuleGameModule("/", initialState));
export const useState = moduleGameModule.getState();
export const actions = moduleGameModule.getActions();
export const MainComponent = moduleGameModule.attachLifecycle(Main);
