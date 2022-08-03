import React from "react";
import { useModuleGameState } from "module/game/hooks";
import { Box } from "@chakra-ui/react";
import { Cell } from "./Cell";
import { SudokuUtil } from "util/SudokuUtil";
import { Timer } from "./Timer";
import { actions } from "module/game";

export const Board = React.memo(() => {
    const difficulty = useModuleGameState((state) => state.difficulty);
    const errorCount = useModuleGameState((state) => state.errorCount);
    const board = useModuleGameState((state) => state.board);
    const size = (window.innerWidth - 30) / 9;

    if (!board || !difficulty) {
        return <div>loading...</div>;
    }

    return (
        <div>
            <div className="info">
                <span>{SudokuUtil.difficultyTranslate(difficulty)}</span>
                <span>錯誤： {3 - errorCount}/3</span>
                <Timer />
                <span className="pause" onClick={actions.pauseOrResumeGame}>
                    暫停
                </span>
            </div>
            <Box bgColor="gray.200" className="board">
                {board.map((column, index) => {
                    return (
                        <div className="row" key={index}>
                            {column.map((cell, index) => (
                                <Cell cell={cell} key={index} size={size} />
                            ))}
                        </div>
                    );
                })}
            </Box>
        </div>
    );
});
