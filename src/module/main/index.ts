import { Module, register } from "react-shiba";
import { Main } from "./Main";
import { Difficulty } from "util/SudokuUtil";
import type { State, Path } from "./type";

const initialState: State = {
    passedGame: {
        [Difficulty.EASY]: 0,
        [Difficulty.MEDIUM]: 0,
        [Difficulty.HARD]: 0,
        [Difficulty.VERY_HARD]: 0,
        [Difficulty.HELL]: 0,
    },
    drawerOpened: false,
};

class MainModule extends Module<Path, State> {
    override onEnter() {
        // TODO
    }

    openDrawer(difficulty?: Difficulty) {
        this.setState({ drawerOpened: difficulty ?? true });
    }

    closeDrawer() {
        this.setState({ drawerOpened: false });
    }

    toGame(difficulty: Difficulty) {
        this.pushHistory("/game", { difficulty });
        this.closeDrawer();
    }

    completeGame(difficulty: Difficulty) {
        this.setState((state) => state.passedGame[difficulty]++);
    }
}

const mainModule = register(new MainModule(null, initialState));
export const useState = mainModule.getState();
export const actions = mainModule.getActions();
export const MainComponent = mainModule.attachLifecycle(Main);
