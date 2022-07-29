import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalBody, Button } from "@chakra-ui/react";
import { useModuleGameState } from "../../hooks";
import { actions as mainActions } from "module/main";
import { useMainState } from "module/main/hooks";
import { SudokuUtil } from "util/SudokuUtil";
import "./index.less";

export const VictoryModal = React.memo(() => {
    const isVictory = useModuleGameState((state) => state.isVictory);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked
    const difficulty = useModuleGameState((state) => state.difficulty!);
    const completeTimes = useMainState((state) => state.passedGame[difficulty]);

    return (
        <Modal size="xs" isCentered isOpen={isVictory} onClose={() => {}}>
            <ModalOverlay />
            <ModalContent className="victory-modal">
                <ModalBody>
                    <h1>恭喜你</h1>
                    <p>
                        你已完成難度 {SudokuUtil.difficultyTranslate(difficulty)} {completeTimes} 次
                    </p>
                    <Button variant="ghost" colorScheme="blue" onClick={() => mainActions.openDrawer()}>
                        新遊戲
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
});
