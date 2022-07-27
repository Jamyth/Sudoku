import React from "react";
import { Board } from "./Board";
import { Controls } from "./Controls";
import "./index.less";

export const Main = React.memo(() => {
    return (
        <div className="sudoku-container">
            <h1>Iamyth Sudoku</h1>
            <Board />
            <Controls />
        </div>
    );
});
