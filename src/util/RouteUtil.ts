import { async } from "react-shiba";
import type React from "react";
import { ErrorComponent } from "./temp";

type Path = "/" | "/game";

interface RouteConfig {
    Component: React.ComponentType;
}

export const routes: Record<Path, RouteConfig> = {
    "/": {
        Component: async(() => import("module/home"), "MainComponent", { ErrorComponent }),
    },
    "/game": {
        Component: async(() => import("module/game"), "MainComponent", { ErrorComponent }),
    },
};
