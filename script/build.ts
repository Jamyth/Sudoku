import { ViteBuilder } from "vite-runner";
import { splitVendorChunkPlugin } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

new ViteBuilder({
    projectDirectory: path.join(__dirname, ".."),
    outDirectory: path.join(__dirname, "../build"),
    tsconfigPath: path.join(__dirname, "../config/tsconfig.src.json"),
    useReact: true,
    plugins: [
        VitePWA({
            registerType: "autoUpdate",
            manifest: {
                name: "老婆專用數獨",
                short_name: "Wife's Sudoku",
                description: "Jamyth's version of Sudoku, no ads",
                icons: [
                    {
                        src: "icon-72x72.png",
                        sizes: "72x72",
                        type: "image/png",
                    },
                    {
                        src: "icon-96x96.png",
                        sizes: "96x96",
                        type: "image/png",
                    },
                    {
                        src: "icon-128x128.png",
                        sizes: "128x128",
                        type: "image/png",
                    },
                    {
                        src: "icon-144x144.png",
                        sizes: "144x144",
                        type: "image/png",
                    },
                    {
                        src: "icon-152x152.png",
                        sizes: "152x152",
                        type: "image/png",
                    },
                    {
                        src: "icon-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "icon-384x384.png",
                        sizes: "384x384",
                        type: "image/png",
                    },
                    {
                        src: "icon-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        }),
        splitVendorChunkPlugin(),
    ],
}).build();
