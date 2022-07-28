import React from "react";
import { NumberSelector } from "./NumberSelector";
import { ModeSelector } from "./ModeSelector";
import "./index.less";

export const Controls = React.memo(() => {
    return (
        <div className="controls">
            <NumberSelector />
            <ModeSelector />
        </div>
    );
});
