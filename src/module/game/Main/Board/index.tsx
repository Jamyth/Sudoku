import React from "react";
import { useModuleGameState } from "module/game/hooks";
import { Box } from "@chakra-ui/react";
import { Cell } from "./Cell";

export const Board = React.memo(() => {
    const board = useModuleGameState((state) => state.board);
    const size = (window.innerWidth - 30) / 9;

    if (!board) {
        return <div>loading...</div>;
    }

    return (
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
    );
});
