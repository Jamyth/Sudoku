import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalBody, Button } from "@chakra-ui/react";
import { actions as mainActions } from "module/main";
import { useModuleGameState } from "../../hooks";
import "./index.less";

export const ErrorModal = React.memo(() => {
    const isOpen = useModuleGameState((state) => state.errorCount === 0);
    const difficulty = useModuleGameState((state) => state.difficulty ?? undefined);

    return (
        <Modal size="xs" isCentered isOpen={isOpen} onClose={() => {}}>
            <ModalOverlay />
            <ModalContent className="game-over-modal">
                <ModalBody>
                    <h1>遊戲結束</h1>
                    <p>你已有 3 次錯誤，所以這場遊戲輸了</p>
                    <Button variant="ghost" colorScheme="blue" onClick={() => mainActions.openDrawer(difficulty)}>
                        新遊戲
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
});
