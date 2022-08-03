import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalBody, Button } from "@chakra-ui/react";
import { useModuleGameState } from "../hooks";
import { actions } from "module/game";
import { actions as mainActions } from "module/main";
import "./index.less";

export const PauseModal = React.memo(() => {
    const isPaused = useModuleGameState((state) => state.isPaused);

    return (
        <Modal size="xs" isCentered isOpen={isPaused} onClose={() => {}}>
            <ModalOverlay />
            <ModalContent className="game-modal">
                <ModalBody>
                    <h1>遊戲已暫停</h1>
                    <Button variant="outline" colorScheme="blue" onClick={actions.pauseOrResumeGame}>
                        繼續遊戲
                    </Button>
                    <Button variant="ghost" colorScheme="blue" onClick={mainActions.toHome}>
                        回主頁
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
});
