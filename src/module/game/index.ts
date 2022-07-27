import { Module, register } from "react-shiba";
import { Main } from "./Main";
import type { ActionMode } from "util/GameUtil";
import { GameUtil } from "util/GameUtil";
import { Difficulty } from "util/SudokuUtil";
import type { Location } from "react-shiba";
import type { State, Path, HistoryState } from "./type";

const initialState: State = {
    board: null,
    selectedCell: null,
    selectedNumber: null,
    selectedMode: null,
};

class ModuleGameModule extends Module<Path, State> {
    override onLocationMatched(routeParams: object, location: Location<HistoryState>): void {
        // TODO/Jamyth
        const difficulty = location.state?.difficulty ?? Difficulty.MEDIUM;

        if (!difficulty) {
            this.pushHistory("/");
        }

        this.setState({
            board: GameUtil.createBoard(difficulty),
        });
    }

    selectNumber(number: number) {
        const { selectedNumber } = this.state;
        this.setState({ selectedNumber: selectedNumber === number ? null : number });
    }

    selectMode(mode: ActionMode) {
        const { selectedMode } = this.state;
        this.setState({ selectedMode: selectedMode === mode ? null : mode });
    }
}

const moduleGameModule = register(new ModuleGameModule("/", initialState));
export const useState = moduleGameModule.getState();
export const actions = moduleGameModule.getActions();
export const MainComponent = moduleGameModule.attachLifecycle(Main);
