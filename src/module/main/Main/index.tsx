import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route } from "react-router";
import { routes } from "util/RouteUtil";
import { ObjectUtil } from "@iamyth/util";
import "css/index.less";

export const Main = React.memo(() => {
    return (
        <ChakraProvider>
            <Routes>
                {ObjectUtil.toArray(routes, (path, { Component }) => (
                    <Route path={path} element={<Component />} key={path} />
                ))}
            </Routes>
        </ChakraProvider>
    );
});
