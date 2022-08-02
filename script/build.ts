import { ViteBuilder } from "vite-runner";
import { splitVendorChunkPlugin } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import vitePluginRequire from "vite-plugin-require";
import path from "path";

new ViteBuilder({
    projectDirectory: path.join(__dirname, ".."),
    outDirectory: path.join(__dirname, "../build"),
    tsconfigPath: path.join(__dirname, "../config/tsconfig.src.json"),
    useReact: true,
    plugins: [vitePluginRequire(), VitePWA(), splitVendorChunkPlugin()],
}).build();
