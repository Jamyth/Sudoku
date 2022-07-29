import React from "react";
import { Button } from "@chakra-ui/react";
import { actions as mainActions } from "module/main";
import "./index.less";

export const Main = React.memo(() => {
    return (
        <div className="home-container">
            <div />
            <h1>Iamyth Sudoku</h1>
            <div className="buttons">
                <Button colorScheme="blue" onClick={mainActions.openDrawer} width="100%">
                    新遊戲
                </Button>
            </div>
        </div>
    );
});
