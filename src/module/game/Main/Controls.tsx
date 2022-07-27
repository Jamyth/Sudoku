import React from "react";
import { useModuleGameState } from "../hooks";
import { actions } from "../index";
import { ActionMode, GameUtil } from "util/GameUtil";
import { EnumUtil } from "@iamyth/util";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const Controls = React.memo(() => {
    const selectedNumber = useModuleGameState((state) => state.selectedNumber);
    const selectedMode = useModuleGameState((state) => state.selectedMode);
    return (
        <div className="controls">
            <div className="numbers">
                {numbers.map((_) => (
                    <div
                        key={_}
                        onClick={() => actions.selectNumber(_)}
                        className={`selector ${selectedNumber === _ ? "selected" : ""}`}
                    >
                        {_}
                    </div>
                ))}
            </div>
            <div className="mode">
                {EnumUtil.toArray(ActionMode).map((_) => (
                    <div
                        onClick={() => actions.selectMode(_)}
                        className={`selector ${selectedMode === _ ? "selected" : ""}`}
                        key={_}
                    >
                        {GameUtil.translateActionMode(_)}
                    </div>
                ))}
            </div>
        </div>
    );
});
