import React from "react";
import type { InteractSudoku } from "util/GameUtil";

export interface Props {
    size: number;
    cell: InteractSudoku;
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const Draft = React.memo(({ size, cell }: Props) => {
    const drafts = cell.draft;
    const scaledSize = Math.floor(size);
    const cellStyle: React.CSSProperties = {
        width: scaledSize,
        height: scaledSize,
        lineHeight: `${scaledSize}px`,
        textAlign: "center",
        fontSize: `${scaledSize * 0.8}px`,
    };

    return (
        <React.Fragment>
            {numbers.map((_) => (
                <div key={_} className="draft-cell" style={cellStyle}>
                    {drafts.includes(_) ? _ : ""}
                </div>
            ))}
        </React.Fragment>
    );
});
