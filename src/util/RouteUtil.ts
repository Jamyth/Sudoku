import { async } from "react-shiba";
import type React from "react";

type Path = "/" | "/game";

interface RouteConfig {
    Component: React.ComponentType;
}

export const routes: Record<Path, RouteConfig> = {
    "/": {
        Component: async(() => import("module/home"), "MainComponent"),
    },
    "/game": {
        Component: async(() => import("module/game"), "MainComponent"),
    },
};
