import React from "react";
import { useModuleGameState } from "../hooks";
import { Box } from "@chakra-ui/react";

export const Board = React.memo(() => {
    const board = useModuleGameState((state) => state.board);
    const size = (window.innerWidth - 30) / 9;

    const cellStyle: React.CSSProperties = {
        width: size,
        height: size,
        lineHeight: `${size}px`,
    };

    if (!board) {
        return <div>loading...</div>;
    }

    return (
        <Box bgColor="gray.200" className="board">
            {board.map((row, index) => {
                return (
                    <div className="row" key={index}>
                        {row.map((_, index) => (
                            <div className={`cell ${_.isGenerated ? "generated" : ""}`} key={index} style={cellStyle}>
                                {_.value}
                            </div>
                        ))}
                    </div>
                );
            })}
        </Box>
    );
});
