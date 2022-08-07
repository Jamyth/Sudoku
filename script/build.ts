import { ViteBuilder } from "vite-runner";
import { splitVendorChunkPlugin } from "vite";
import path from "path";

new ViteBuilder({
    projectDirectory: path.join(__dirname, ".."),
    outDirectory: path.join(__dirname, "../build"),
    tsconfigPath: path.join(__dirname, "../config/tsconfig.src.json"),
    useReact: true,
    plugins: [splitVendorChunkPlugin()],
}).build();
