import React from "react";
import { Button } from "@chakra-ui/react";
import { actions as mainActions } from "module/main";
import { GAME_STORAGE_KEY } from "util/StorageKey";
import "./index.less";

export const Main = React.memo(() => {
    const hasGame = localStorage.getItem(GAME_STORAGE_KEY) !== null;

    return (
        <div className="home-container">
            <div />
            <h1>Iamyth Sudoku</h1>
            <div className="buttons">
                {hasGame && (
                    <Button colorScheme="blue" onClick={() => mainActions.toGame()} width="100%">
                        繼續遊戲
                    </Button>
                )}
                <Button variant="outline" colorScheme="blue" onClick={() => mainActions.openDrawer()} width="100%">
                    新遊戲
                </Button>
            </div>
        </div>
    );
});
