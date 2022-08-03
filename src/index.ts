import { async, createApp } from "react-shiba";
import { ErrorHandler } from "util/ErrorHandler";
import { ErrorComponent } from "util/temp";
// import { registerSW } from "virtual:pwa-register";

// const updateTime = 60 * 60 * 1000

// registerSW({
//     onRegistered: (r) => {
//         r?.update();
//     },
// });

const Component = async(() => import("module/main"), "MainComponent", { ErrorComponent });

createApp({
    Component,
    entryElement: document.getElementById("app"),
    errorHandler: new ErrorHandler(),
    withReactRouter: true,
});
