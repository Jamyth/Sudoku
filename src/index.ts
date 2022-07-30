import { async, createApp } from "react-shiba";
import { ErrorHandler } from "util/ErrorHandler";

const Component = async(() => import("module/main"), "MainComponent");

createApp({
    Component,
    entryElement: document.getElementById("app"),
    errorHandler: new ErrorHandler(),
});
