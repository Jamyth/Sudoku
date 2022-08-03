import { Module, register } from "react-shiba";
import { Main } from "./Main";
import type { State, Path } from "./type";

const initialState: State = {};

class ModuleLeaderboardModule extends Module<Path, State> {
    override onEnter() {
        // TODO
    }
}

const moduleLeaderboardModule = register(new ModuleLeaderboardModule(null, initialState));
export const useState = moduleLeaderboardModule.getState();
export const actions = moduleLeaderboardModule.getActions();
export const MainComponent = moduleLeaderboardModule.attachLifecycle(Main);
