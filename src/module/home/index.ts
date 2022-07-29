import { Module, register } from "react-shiba";
import { Main } from "./Main";
import type { State, Path } from "./type";

const initialState: State = {};

class ModuleHomeModule extends Module<Path, State> {
    override onEnter() {
        // TODO
    }
}

const moduleHomeModule = register(new ModuleHomeModule(null, initialState));
export const useState = moduleHomeModule.getState();
export const actions = moduleHomeModule.getActions();
export const MainComponent = moduleHomeModule.attachLifecycle(Main);
