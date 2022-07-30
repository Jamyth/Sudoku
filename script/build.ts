import { ViteBuilder } from "vite-runner";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

new ViteBuilder({
    projectDirectory: path.join(__dirname, ".."),
    outDirectory: path.join(__dirname, "../build"),
    tsconfigPath: path.join(__dirname, "../config/tsconfig.src.json"),
    useReact: true,
    plugins: [VitePWA()],
}).build();
