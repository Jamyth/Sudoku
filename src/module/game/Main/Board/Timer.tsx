import { useModuleGameState } from "module/game/hooks";
import React from "react";
import { actions } from "module/game";

export const Timer = React.memo(() => {
    const elapsedTime = useModuleGameState((state) => state.elapsedTime);

    const minutes = Math.floor(elapsedTime / 60);
    const second = elapsedTime % 60;

    React.useEffect(() => {
        const timer = setInterval(() => actions.increaseTime(), 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <span>
            {minutes.toString().padStart(2, "0")} : {second.toString().padStart(2, "0")}
        </span>
    );
});
