import { useModuleGameState } from "module/game/hooks";
import React from "react";
import { actions } from "module/game";
import { GameUtil } from "util/GameUtil";

export const Timer = React.memo(() => {
    const elapsedTime = useModuleGameState((state) => state.elapsedTime);

    React.useEffect(() => {
        const timer = setInterval(() => actions.increaseTime(), 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return <span>{GameUtil.toTimeString(elapsedTime)}</span>;
});
