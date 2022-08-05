import { Button } from "@chakra-ui/react";
import { ObjectUtil } from "@iamyth/util";
import { useMainState } from "module/main/hooks";
import React from "react";
import { GameUtil } from "util/GameUtil";
import { SudokuUtil } from "util/SudokuUtil";
import { actions as mainActions } from "module/main";
import "./index.less";

export const Main = React.memo(() => {
    const bestTime = useMainState((state) => state.bestTime);
    const passedGame = useMainState((state) => state.passedGame);

    return (
        <div className="leaderboard">
            <h1>統計表</h1>
            <div className="content">
                {ObjectUtil.toArray(bestTime, (difficulty, time) => (
                    <div>
                        <span>{SudokuUtil.difficultyTranslate(difficulty)}</span>
                        <div>
                            <span>通關次數</span>
                            <span>{passedGame[difficulty]}</span>
                        </div>
                        <div>
                            <span>時長</span>
                            <span>{time > 0 ? GameUtil.toTimeString(time) : "無紀錄"}</span>
                        </div>
                    </div>
                ))}
            </div>
            <Button variant="outline" colorScheme="blue" onClick={() => mainActions.toHome()} width="100%">
                返回
            </Button>
            <div />
        </div>
    );
});
