import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

import { dependencies } from './package.json';

const globalVendorPackages = ['react', 'react-dom', 'react-router-dom'];

function renderChunks(deps: Record<string, string>) {
    let chunks = {};

    Object.keys(deps).forEach((key) => {
        if (globalVendorPackages.includes(key)) return;
        chunks[key] = [key];
    });
    return chunks;
}

// https://vitejs.dev/config/
export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return defineConfig({
        plugins: [
            react(),
            createHtmlPlugin({
                minify: true,
                inject: {
                    data: {
                        title: env.VITE_CLIENT_NAME,
                    },
                },
            }),
        ],
        build: {
            sourcemap: false,
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: globalVendorPackages,
                        ...renderChunks(dependencies),
                    },
                },
            },
        },
    });
};
