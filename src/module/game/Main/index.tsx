import React from "react";
import { useModuleGameState } from "../hooks";
import { Board } from "./Board";
import { Controls } from "./Controls";
import "./index.less";

export const Main = React.memo(() => {
    const errorCount = useModuleGameState((state) => state.errorCount);

    if (errorCount === 0) {
        alert("you lost.");
    }

    return (
        <div className="sudoku-container">
            <h1>Iamyth Sudoku</h1>
            <Board />
            <Controls />
        </div>
    );
});
