import React from "react";
import { Drawer, DrawerOverlay, DrawerContent, DrawerBody } from "@chakra-ui/react";
import { Difficulty, SudokuUtil } from "util/SudokuUtil";
import { EnumUtil } from "@iamyth/util/dist/cjs/core/EnumUtil";
import { useMainState } from "module/main/hooks";
import { actions as mainActions } from "module/main";
import Lock from "./asset/lock.svg";
import "./index.less";

export const ActionDrawer = React.memo(() => {
    const isOpen = useMainState((state) => state.drawerOpened);
    const passedGame = useMainState((state) => state.passedGame);

    return (
        <Drawer placement="bottom" isOpen={isOpen !== false} onClose={() => {}}>
            <div className="action-drawer">
                <DrawerOverlay zIndex={1500} />
                <DrawerContent className="test" zIndex={1500} background="transparent" padding="0 15px">
                    <DrawerBody padding="0">
                        <div className="action-drawer-body">
                            <div className="difficulty-selector">
                                {EnumUtil.toArray(Difficulty).map((_) => {
                                    const [targetDifficulty, requiredRounds] = SudokuUtil.unlockRoundNumber(_);
                                    const isLocked = passedGame[targetDifficulty] < requiredRounds;
                                    return (
                                        <div
                                            className={`button ${isLocked ? "locked" : ""}`}
                                            key={_}
                                            onClick={!isLocked ? () => mainActions.toGame(_) : undefined}
                                        >
                                            {isLocked && <img src={Lock} />}
                                            <div>{SudokuUtil.difficultyTranslate(_)}</div>
                                            {isLocked && (
                                                <div>
                                                    完成 {requiredRounds - passedGame[targetDifficulty]} 個
                                                    {SudokuUtil.difficultyTranslate(targetDifficulty)}關卡即可解鎖
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                                {typeof isOpen !== "boolean" && (
                                    <div className="button" onClick={() => mainActions.toGame(isOpen)}>
                                        重新開始
                                    </div>
                                )}
                            </div>
                            <div className="button" onClick={mainActions.closeDrawer}>
                                取消
                            </div>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </div>
        </Drawer>
    );
});
