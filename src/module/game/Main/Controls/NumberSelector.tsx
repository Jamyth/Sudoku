import React from "react";
import { actions } from "module/game";
import { useModuleGameState } from "module/game/hooks";
import { GameUtil } from "util/GameUtil";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const NumberSelector = React.memo(() => {
    const board = useModuleGameState((state) => state.board);
    const answer = useModuleGameState((state) => state.answer);

    if (!board || !answer) {
        return null;
    }

    return (
        <div className="numbers">
            {numbers.map((_) => {
                const interactSudoku = GameUtil.getInteractSudokuOf(board, _);
                const isUsedUp =
                    interactSudoku.length === 9 &&
                    interactSudoku.every((sudoku) => {
                        const { row, column } = sudoku;
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- GameUtil return valid sudoku
                        return board[row][column].value === answer[row][column];
                    });

                return (
                    <div
                        key={_}
                        onClick={!isUsedUp ? () => actions.onNumberClick(_) : undefined}
                        className={`selector ${isUsedUp ? "used" : ""}`}
                    >
                        {isUsedUp ? "" : _}
                    </div>
                );
            })}
        </div>
    );
});
