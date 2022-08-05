import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { routes } from "util/RouteUtil";
import { ActionDrawer } from "./ActionDrawer";
import { Routes, Route } from "react-router";
import { ObjectUtil } from "@iamyth/util";
import "css/index.less";

export const Main = React.memo(() => {
    return (
        <React.StrictMode>
            <ChakraProvider>
                <Routes>
                    {ObjectUtil.toArray(routes, (path, { Component }) => (
                        <Route path={path} element={<Component />} key={path} />
                    ))}
                </Routes>
                <ActionDrawer />
            </ChakraProvider>
        </React.StrictMode>
    );
});
