import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    // 加载环境变量，指定目录为 env
    const env = loadEnv(mode, path.resolve(__dirname, 'env'), '')

    return {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        envDir: "env",
        plugins: [react()],
        server: {
            proxy: {
                '/api': {
                    target: env.VITE_PROXY_FAST_FINANCE_API,
                    changeOrigin: true,
                    secure: false,
                },
                '/pb': {
                    target: env.VITE_PROXY_POLY_BULL_API,
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
    }
})
