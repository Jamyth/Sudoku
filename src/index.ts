import { async, createApp } from "react-shiba";
import { ErrorHandler } from "util/ErrorHandler";

createApp({
    Component: async(() => import("module/main"), "MainComponent"),
    entryElement: document.getElementById("app"),
    errorHandler: new ErrorHandler(),
});
