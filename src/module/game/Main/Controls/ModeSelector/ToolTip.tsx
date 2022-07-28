import React from "react";
import { ActionMode } from "util/GameUtil";
import { useModuleGameState } from "module/game/hooks";

export interface Props {
    type: ActionMode;
}

export const ToolTip = React.memo(({ type }: Props) => {
    const tipsQuota = useModuleGameState((state) => state.tipsQuota);
    const draftStatus = useModuleGameState((state) => (state.selectedMode === ActionMode.DRAFT ? "On" : "Off"));

    if (type === ActionMode.CLEAN) {
        return null;
    }

    return (
        <div className="tool-tip">
            {type === ActionMode.TIPS && tipsQuota}
            {type === ActionMode.DRAFT && draftStatus}
        </div>
    );
});
