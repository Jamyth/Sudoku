import { async } from "react-shiba";
import type React from "react";

type Path = "/";

interface RouteConfig {
    Component: React.ComponentType;
}

export const routes: Record<Path, RouteConfig> = {
    "/": {
        Component: async(() => import("module/game"), "MainComponent"),
    },
};
