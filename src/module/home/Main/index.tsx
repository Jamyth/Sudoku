import React from "react";
import { Button } from "@chakra-ui/react";
import { actions as mainActions } from "module/main";
import { GAME_STORAGE_KEY } from "util/StorageKey";
import type { State as GameData } from "module/game/type";
import { SudokuUtil } from "util/SudokuUtil";
import { GameUtil } from "util/GameUtil";
import "./index.less";

export const Main = React.memo(() => {
    const rawGame = localStorage.getItem(GAME_STORAGE_KEY);
    const game: GameData | null = rawGame ? JSON.parse(rawGame) : null;

    return (
        <div className="home-container">
            <div />
            <h1>Iamyth Sudoku</h1>
            <div className="buttons">
                {game && (
                    <Button colorScheme="blue" className="continue" onClick={() => mainActions.toGame()} width="100%">
                        繼續遊戲
                        <div>
                            {GameUtil.toTimeString(game.elapsedTime)} -{" "}
                            {
                                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked
                                SudokuUtil.difficultyTranslate(game.difficulty!)
                            }
                        </div>
                    </Button>
                )}
                <Button variant="outline" colorScheme="blue" onClick={() => mainActions.openDrawer()} width="100%">
                    新遊戲
                </Button>
                <Button variant="ghost" colorScheme="blue" onClick={() => mainActions.toLeaderBoard()} width="100%">
                    統計表
                </Button>
            </div>
        </div>
    );
});
