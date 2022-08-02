import React from "react";
import { useModuleGameState } from "module/game/hooks";
import { actions } from "module/game";
import { EnumUtil } from "@iamyth/util/dist/cjs/core/EnumUtil";
import { ActionMode, GameUtil } from "util/GameUtil";
import { ToolTip } from "./ToolTip";
import "./index.less";

export const ModeSelector = React.memo(() => {
    const selectedMode = useModuleGameState((state) => state.selectedMode);
    return (
        <div className="mode">
            {EnumUtil.toArray(ActionMode).map((_) => (
                <div
                    onClick={() => actions.selectMode(_)}
                    className={`selector ${selectedMode === _ ? "selected" : ""}`}
                    key={_}
                >
                    <ToolTip type={_} />
                    {GameUtil.translateActionMode(_)}
                </div>
            ))}
        </div>
    );
});
