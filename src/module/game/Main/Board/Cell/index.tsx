import React from "react";
import { useModuleGameState } from "module/game/hooks";
import { Draft } from "./Draft";
import { actions } from "module/game";
import type { InteractSudoku } from "util/GameUtil";
import { GameUtil } from "util/GameUtil";
import { SudokuUtil } from "util/SudokuUtil";
import "./index.less";

export interface Props {
    cell: InteractSudoku;
    size: number;
}

export const Cell = React.memo(({ cell, size }: Props) => {
    const { row, column } = cell;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- cell is rendered when board is ready
    const playableBoard = useModuleGameState((state) => state.board!);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- cell is rendered when board is ready
    const answer = useModuleGameState((state) => state.answer![row][column]);
    const pureBoard = GameUtil.toPureSudokuBoard(playableBoard);
    const selectedCell = useModuleGameState((state) => state.selectedCell);
    const hasError = (cell.value !== null && cell.value !== answer) || SudokuUtil.hasDuplicate(pureBoard, row, column);
    const isSelected =
        (selectedCell?.row === row && selectedCell?.column === column) ||
        (cell.value !== null && selectedCell?.value === cell.value);

    const draftSize = size / 3 - 1;

    const cellStyle: React.CSSProperties = {
        width: size,
        height: size,
        lineHeight: `${size}px`,
    };

    const onClick = () => {
        actions.selectCell(cell);
    };

    return (
        <div
            onClick={onClick}
            style={cellStyle}
            className={`cell ${isSelected ? "selected" : ""} ${cell.isGenerated ? "generated" : ""} ${
                hasError ? "error" : ""
            }`}
        >
            {cell.value}
            {!cell.isGenerated && cell.value === null && <Draft size={draftSize} cell={cell} />}
        </div>
    );
});
