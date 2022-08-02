import React from "react";

export const ErrorComponent = React.memo(({ error }: any) => {
    React.useEffect(() => {
        console.info(error);
    }, []);

    return <h1>OMG</h1>;
});
